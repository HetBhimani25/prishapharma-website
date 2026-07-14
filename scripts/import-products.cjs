#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Prisha Pharma — Smart Excel → products.json Importer  v2
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Supports TWO Excel formats automatically:
 *
 *   FORMAT A — Prevego style (category as section-banner rows):
 *     • Company header rows at top (auto-skipped)
 *     • Category section banners: e.g. ══ Tablets ══ (dark rows)
 *     • Columns: Sr No | Product Name | Generic Name | Pack | PTS | MRP | HSN
 *
 *   FORMAT B — Ajanta/Column-category style (Therapy column per row):
 *     • Company header at top (auto-skipped)
 *     • Columns: Sr.No | SAP Code | Product | Brand | Therapy | Composition |
 *                Pack Size | Base Unit | Case Lot | PTS | Pur Qty | Free Qty | Bonus PTS
 *     • Category read from "Therapy" (or "Category") column per product row
 *     • Price read from "PTS" (Price to Stockist) column
 *
 * USAGE:
 *   node scripts/import-products.cjs <excel-file> [company-name]
 *
 * DEFAULT (safe): Always KEEPS all other companies. Only replaces THIS company.
 *
 * EXAMPLES:
 *   node scripts/import-products.cjs "C:\Downloads\AjantaGencare.xlsx" "Ajanta Pharma"
 *   node scripts/import-products.cjs "C:\Downloads\Prevego.xlsx" "Prevego"
 *   node scripts/import-products.cjs "C:\Downloads\Alkem.xlsx" "Alkem"
 *
 *   # Only use --overwrite if you want to DELETE ALL products and start from scratch:
 *   node scripts/import-products.cjs "C:\Downloads\file.xlsx" "Company" --overwrite
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

const XLSX = require('xlsx');
const fs   = require('fs');
const path = require('path');

const OUTPUT_PATH  = path.join(__dirname, '..', 'src', 'data', 'products.json');
const DEFAULT_IMG  = 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=70';

// ── Therapy / category normaliser ─────────────────────────────────────────────
function normaliseCategory(raw) {
  if (!raw) return 'General';
  const t = raw.trim();

  // Already clean — return as-is if it looks like a proper category
  const map = [
    [/tablet/i,                              'Tablets'],
    [/capsule|cap\b/i,                       'Capsules'],
    [/cream|ointment|gel|lotion/i,           'Creams, Ointments, Gels & Lotions'],
    [/syrup|liquid|suspension/i,             'Syrups & Liquids'],
    [/injectable|injection|inj\b/i,          'Injectables'],
    [/sachet|granule/i,                      'Sachets'],
    [/powder|prickly/i,                      'Powders'],
    [/soap/i,                                'Soaps'],
    [/drop/i,                                'Drops'],
    [/spray/i,                               'Sprays'],
    [/suppository/i,                         'Suppository'],
    [/respiratory|inhaler/i,                 'Respiratory'],
    [/nutraceutical|multivitamin|multi.vit/i,'Nutraceuticals'],
    [/cardiology|cardiac|cardio/i,           'Cardiology'],
    [/gastro|gastroenterology|gastrology/i,  'Gastroenterology'],
    [/pain|analgesic/i,                      'Pain Management'],
    [/anti.malarial|malaria/i,               'Anti-Malarial'],
    [/anti.infective|antibiotic/i,           'Anti-Infectives'],
    [/derma|skin|dermatology/i,              'Dermatology'],
    [/neuro|neurology|cns/i,                 'Neurology'],
    [/gynaec|gynaecology|obs/i,              'Gynaecology'],
    [/diabetes|diabetology|diabetic/i,       'Diabetes'],
    [/ophthalm|eye/i,                        'Ophthalmology'],
    [/ent|ear.nose/i,                        'ENT'],
    [/oncology|cancer/i,                     'Oncology'],
    [/chs|cough|cold/i,                      'Cough & Cold'],
    [/orthop|bone|joint/i,                   'Orthopaedics'],
    [/urology|kidney|renal/i,                'Urology'],
    [/psychiatr|mental|psych/i,              'Psychiatry'],
  ];

  for (const [re, label] of map) {
    if (re.test(t)) return label;
  }
  // Return as-is (title case)
  return t.split(' ').map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

// ── Banner-row category keywords (Prevego format) ────────────────────────────
const BANNER_KW = [
  'tablets','capsules','cream','ointment','gel','lotion','soap',
  'injectable','injection','sachet','powder','syrup','liquid','drop',
  'respiratory','suppository','spray','suspension','emulsion','solution',
  'granule','nutritional',
];
function isCategoryBanner(row) {
  const cells = row.map((c) => String(c || '').trim()).filter(Boolean);
  if (!cells.length || cells.length > 3) return false;
  const text = cells.join(' ').toLowerCase();
  return BANNER_KW.some((kw) => text.includes(kw));
}

// ── Header-row detection ──────────────────────────────────────────────────────
// Recognises headers from Prevego, Ajanta (Therapy), and Vitalcare (Material Description) formats
function findHeaderRow(rows) {
  const HEADER_SIGNALS = [
    'product name', 'product', 'medicine name', 'medicine',
    'item name', 'item description',
    'material description', 'material desc',   // Vitalcare
    'material code',                            // Vitalcare (often in same row)
    'sr no.', 'sr no', 'sr.no', 'srno', 'sr. no',
  ];
  for (let i = 0; i < Math.min(rows.length, 25); i++) {
    const rowText = rows[i].map((c) => String(c || '').toLowerCase().trim());
    if (rowText.some((c) => HEADER_SIGNALS.includes(c))) return i;
  }
  return -1;
}

// ── Column finder ─────────────────────────────────────────────────────────────
function findCol(headerRow, aliases) {
  const headers = headerRow.map((h) => String(h || '').toLowerCase().trim());
  for (const alias of aliases) {
    // Exact match first
    let idx = headers.findIndex((h) => h === alias);
    if (idx !== -1) return idx;
    // Then partial match
    idx = headers.findIndex((h) => h.includes(alias));
    if (idx !== -1) return idx;
  }
  return -1;
}

// ── Find the PTS price column — avoid "Bonus PTS" ────────────────────────────
function findPriceCol(headerRow) {
  const headers = headerRow.map((h) => String(h || '').toLowerCase().trim());

  // Priority 1: exact MRP labels
  const mrpAliases = ['mrp','m.r.p','msp','retail price','max. retail price'];
  for (const alias of mrpAliases) {
    const idx = headers.findIndex((h) => h === alias || h.includes(alias));
    if (idx !== -1) return { idx, label: headers[idx] };
  }

  // Priority 2: exact "pts" (not "bonus pts")
  const ptsExact = headers.findIndex((h) => h === 'pts');
  if (ptsExact !== -1) return { idx: ptsExact, label: 'pts' };

  // Priority 3: column contains "price" or "rate" but not "bonus"
  const priceIdx = headers.findIndex(
    (h) => (h.includes('price') || h.includes('rate')) && !h.includes('bonus')
  );
  if (priceIdx !== -1) return { idx: priceIdx, label: headers[priceIdx] };

  // Priority 4: any "pts" that isn't "bonus pts"
  const anyPts = headers.findIndex(
    (h) => h.includes('pts') && !h.includes('bonus')
  );
  if (anyPts !== -1) return { idx: anyPts, label: headers[anyPts] };

  return { idx: -1, label: 'not found' };
}

// ── Main parser ───────────────────────────────────────────────────────────────
function parseSheet(rows, companyName, headerRowIdx) {
  const headerRow = rows[headerRowIdx];

  // Detect columns
  const colSr   = findCol(headerRow, ['sr no.','sr no','sr.no','srno','s.no','sno','sr. no']);

  // Product name — Prevego: "Product Name" | Ajanta: "Product" | Vitalcare: "Material Description"
  const colName = findCol(headerRow, [
    'product name', 'product',
    'material description', 'material desc',   // Vitalcare
    'medicine name', 'medicine',
    'item name', 'item description', 'item',
  ]);

  // Composition — listed before generic 'description' to avoid matching 'Material Description'
  const colComp = findCol(headerRow, [
    'material composition',                    // Vitalcare
    'composition', 'generic name', 'generic',
    'ingredient', 'salt', 'content', 'formula',
  ]);

  const colPack = findCol(headerRow, ['pack size','pack','packing']);

  // Category column — Ajanta: "Therapy" | Vitalcare: "Group name" | others: "Category"
  const colCat  = findCol(headerRow, [
    'group name', 'group',                     // Vitalcare
    'therapy',                                 // Ajanta
    'category', 'indication', 'product type',
    'segment', 'dept', 'department',
  ]);

  // Price column — smart detection avoids "Bonus PTS"
  const { idx: colPrice, label: priceLabel } = findPriceCol(headerRow);

  // Detect format
  const hasTherapyCol = colCat !== -1;

  console.log(`\n📋  Column mapping detected:`);
  console.log(`    Format         → ${hasTherapyCol ? 'B (Therapy/column-category)' : 'A (Section-banner category)'}`);
  console.log(`    Sr No.         → col ${colSr}`);
  console.log(`    Product Name   → col ${colName}`);
  console.log(`    Composition    → col ${colComp}`);
  console.log(`    Pack           → col ${colPack}`);
  console.log(`    Category       → col ${colCat} (${colCat !== -1 ? headerRow[colCat] : 'from section banners'})`);
  console.log(`    Price (${priceLabel.padEnd(8)}) → col ${colPrice}`);

  if (colName === -1) {
    console.error('\n❌  Could not find a "Product" or "Product Name" column.');
    console.error('    Make sure the header row contains exactly "Product" or "Product Name".\n');
    process.exit(1);
  }

  const products   = [];
  let bannerCat    = 'General'; // for Format A (Prevego-style)
  let idCounter    = 1;
  let skipped      = 0;

  for (let i = headerRowIdx + 1; i < rows.length; i++) {
    const row = rows[i];

    // Skip fully blank rows
    if (!row.some((c) => c !== '' && c !== null && c !== undefined)) continue;

    // Format A: detect category banner rows
    if (!hasTherapyCol && isCategoryBanner(row)) {
      bannerCat = normaliseCategory(row.filter((c) => c !== '').join(' '));
      console.log(`   📂  Category banner: ${bannerCat}`);
      continue;
    }

    // Skip non-numeric Sr rows (title rows, sub-headers, etc.)
    if (colSr !== -1) {
      const srVal = String(row[colSr] ?? '').trim();
      if (srVal && !/^\d+$/.test(srVal)) { skipped++; continue; }
    }

    const name = String(row[colName] ?? '').trim();
    if (!name || /^product/i.test(name)) continue;

    // Category — from column (Format B) or banner (Format A)
    const rawCat  = hasTherapyCol ? String(row[colCat] ?? '').trim() : bannerCat;
    const category = normaliseCategory(rawCat) || 'General';

    // Price
    const priceRaw = colPrice !== -1 ? String(row[colPrice] ?? '').replace(/[^0-9.]/g, '') : '';
    const mrp      = priceRaw ? parseFloat(priceRaw).toFixed(2) : '0.00';

    // Pack
    const pack = colPack !== -1 ? String(row[colPack] ?? '').trim() : '';

    // Composition — split on " + " separators
    const compRaw   = colComp !== -1 ? String(row[colComp] ?? '').trim() : '';
    const composition = compRaw
      ? compRaw.split(/\s*\+\s*/).map((s) => s.trim()).filter(Boolean)
      : [];

    products.push({
      id: idCounter++,
      name,
      brand:       companyName,
      category,
      description: `${name} — ${companyName} pharmaceutical product.`,
      image:       DEFAULT_IMG,
      pack,
      mrp,
      composition,
    });
  }

  if (skipped > 0) console.log(`   ⏭️   Skipped ${skipped} non-data rows (headers, titles, etc.)`);
  return products;
}

// ── Entry point ───────────────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);

  if (!args.length) {
    console.log(`
Usage:
  node scripts/import-products.cjs <excel-file> [company-name]

Default (SAFE): Keeps all other companies. Only updates THIS company.

Examples:
  node scripts/import-products.cjs "C:\\Downloads\\AjantaGencare.xlsx" "Ajanta Pharma"
  node scripts/import-products.cjs "C:\\Downloads\\Prevego.xlsx" "Prevego"
  node scripts/import-products.cjs "C:\\Downloads\\Alkem.xlsx" "Alkem"

  # Only if you want to WIPE everything and start fresh:
  node scripts/import-products.cjs "C:\\Downloads\\file.xlsx" "Company" --overwrite
`);
    process.exit(1);
  }

  const nonFlags    = args.filter((a) => !a.startsWith('--'));
  const inputArg    = nonFlags[0];
  const companyArg  = nonFlags[1] || 'Unknown';
  // DEFAULT = safe merge. Only wipe if --overwrite is explicitly passed.
  const appendMode  = !args.includes('--overwrite');

  const inputPath = path.resolve(process.cwd(), inputArg);
  if (!fs.existsSync(inputPath)) {
    console.error(`\n❌  File not found: ${inputPath}\n`);
    process.exit(1);
  }

  console.log(`\n📂  File    : ${inputPath}`);
  console.log(`🏢  Company : ${companyArg}`);
  if (!appendMode) {
    console.log(`📝  Mode    : ⚠️  OVERWRITE — ALL existing products will be deleted!`);
  } else {
    console.log(`📝  Mode    : ✅ SAFE MERGE — all other companies will be kept`);
  }

  const workbook  = XLSX.readFile(inputPath);
  const sheetName = workbook.SheetNames[0];
  const sheet     = workbook.Sheets[sheetName];
  const rows      = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

  console.log(`📋  Sheet   : "${sheetName}"  (${rows.length} rows)`);

  if (rows.length < 2) {
    console.error('\n❌  Sheet appears empty.\n'); process.exit(1);
  }

  const headerRowIdx = findHeaderRow(rows);
  if (headerRowIdx === -1) {
    console.error('\n❌  Could not find header row. Make sure one row contains "Product" or "Sr No.".\n');
    process.exit(1);
  }
  console.log(`🔍  Header row at Excel row ${headerRowIdx + 1}`);

  const newProducts = parseSheet(rows, companyArg, headerRowIdx);

  if (!newProducts.length) {
    console.error('\n❌  No valid products found. Check the file.\n'); process.exit(1);
  }

  // Merge (default) or overwrite
  let finalProducts = newProducts;
  if (appendMode && fs.existsSync(OUTPUT_PATH)) {
    const existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
    // Remove only THIS company's old products, keep everyone else
    const others   = existing.filter((p) => p.brand !== companyArg);
    const wasHere  = existing.length - others.length;
    finalProducts  = [
      ...others,
      ...newProducts.map((p, i) => ({ ...p, id: others.length + i + 1 })),
    ];
    if (wasHere > 0) {
      console.log(`\n🔄  Replaced ${wasHere} old "${companyArg}" products with ${newProducts.length} new ones.`);
    }
    console.log(`🔗  Total in products.json: ${others.length} (other companies) + ${newProducts.length} (${companyArg}) = ${finalProducts.length}`);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalProducts, null, 2), 'utf-8');

  // Summary by category
  const byCat = {};
  newProducts.forEach((p) => { byCat[p.category] = (byCat[p.category] || 0) + 1; });

  console.log(`\n\n✅  Import complete!`);
  console.log(`    Products imported : ${newProducts.length}`);
  console.log(`    Saved to          : src/data/products.json`);
  console.log(`\n📊  By category:`);
  Object.entries(byCat).sort((a, b) => b[1] - a[1]).forEach(([cat, n]) => {
    console.log(`    ${cat.padEnd(40)} ${String(n).padStart(4)}`);
  });

  console.log(`\n🚀  Next:`);
  console.log(`    git add . && git commit -m "Add ${companyArg} products" && git push\n`);
}

main();
