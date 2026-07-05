#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Prisha Pharma — Smart Excel → products.json Importer
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Supports the Prevego-style Excel format:
 *   • Company header rows at the top (auto-skipped)
 *   • Category section banners (e.g. "Tablets", "Capsules") auto-detected
 *   • Two price columns (PTS + MRP) — uses MRP automatically
 *   • Merges into existing products.json (append mode) OR overwrites
 *
 * USAGE:
 *   node scripts/import-products.cjs <excel-file> [company-name] [--append] [--overwrite]
 *
 * EXAMPLES:
 *   # Import Prevego products (overwrites existing products.json)
 *   node scripts/import-products.cjs "C:\Downloads\Prevego.xlsx" "Prevego"
 *
 *   # Import Alkem products and ADD to existing list (keeps previous companies)
 *   node scripts/import-products.cjs "C:\Downloads\Alkem.xlsx" "Alkem" --append
 *
 *   # Import from current folder
 *   node scripts/import-products.cjs Prevego.xlsx "Prevego"
 *
 * SUPPORTED EXCEL FORMATS:
 *
 *   Format A — Standard (header in row 1):
 *     | Product Name | Company | Category | Pack | MRP | Composition |
 *
 *   Format B — Prevego-style (company header at top, categories as section rows):
 *     Row 1-3: Company header / address / logo (auto-skipped)
 *     Row 4:   | Sr No. | Product Name | Generic Name | Pack | [PTS] | Mrp | HSN |
 *     Row 5:   ══════════ Tablets ══════════   (category banner — auto-detected)
 *     Row 6+:  | 1 | ACAMPROVAC 333 TAB | ACAMPROSATE... | 6 TAB | 35.00 | 91.00 | ...
 *
 * CATEGORY KEYWORDS (auto-detected from section banners):
 *   Tablets, Capsules, Creams, Ointments, Gels, Lotions, Soaps,
 *   Injectables, Sachets, Powders, Syrups, Liquids, Drops,
 *   Respiratory, Suppository, Sprays
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

const XLSX   = require('xlsx');
const fs     = require('fs');
const path   = require('path');

const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'products.json');

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=70';

// Known category section keywords
const CATEGORY_KEYWORDS = [
  'tablets', 'capsules', 'cream', 'ointment', 'gel', 'lotion',
  'soap', 'injectable', 'sachet', 'powder', 'syrup', 'liquid',
  'drop', 'respiratory', 'suppository', 'spray', 'injection',
  'suspension', 'emulsion', 'solution', 'granule', 'nutritional',
];

// Check if a row is a category banner (e.g. "══ Tablets ══")
function isCategoryRow(row) {
  const cells = row.map((c) => String(c || '').trim()).filter(Boolean);
  if (cells.length === 0) return false;
  if (cells.length > 3) return false; // data rows have many columns
  const text = cells.join(' ').toLowerCase();
  return CATEGORY_KEYWORDS.some((kw) => text.includes(kw));
}

// Extract category name from a banner row
function extractCategory(row) {
  const text = row.map((c) => String(c || '').trim()).filter(Boolean).join(' ');
  // Normalise common multi-word categories
  if (/cream|ointment|gel|lotion/i.test(text)) return 'Creams, Ointments, Gels & Lotions';
  if (/syrup|liquid/i.test(text))              return 'Syrups & Liquids';
  if (/injectable|injection/i.test(text))      return 'Injectables';
  if (/suppository/i.test(text))               return 'Suppository';
  if (/respiratory/i.test(text))               return 'Respiratory';
  if (/spray/i.test(text))                     return 'Sprays';
  if (/drop/i.test(text))                      return 'Drops';
  if (/sachet/i.test(text))                    return 'Sachets';
  if (/powder/i.test(text))                    return 'Powders';
  if (/soap/i.test(text))                      return 'Soaps';
  if (/capsule/i.test(text))                   return 'Capsules';
  if (/tablet/i.test(text))                    return 'Tablets';
  if (/nutritional/i.test(text))               return 'Nutritional';
  // Fallback: return as-is, capitalised
  return text.split(' ').map((w) => w[0]?.toUpperCase() + w.slice(1)).join(' ');
}

// Find the real header row (contains "Product Name" or "Sr No")
function findHeaderRow(rows) {
  for (let i = 0; i < Math.min(rows.length, 20); i++) {
    const rowText = rows[i].map((c) => String(c || '').toLowerCase().trim());
    if (rowText.some((c) => c.includes('product name') || c === 'product')) {
      return i;
    }
    if (rowText.some((c) => c === 'sr no.' || c === 'sr no' || c === 'sr.no' || c === 'srno')) {
      return i;
    }
  }
  return -1;
}

// Find column index by keyword aliases
function findCol(headerRow, aliases) {
  const headers = headerRow.map((h) => String(h || '').toLowerCase().trim());
  for (const alias of aliases) {
    const idx = headers.findIndex((h) => h.includes(alias));
    if (idx !== -1) return idx;
  }
  return -1;
}

// ── Parse Prevego-style sheet (category sections embedded in rows) ──────────
function parseSheet(rows, companyName, headerRowIdx) {
  const headerRow = rows[headerRowIdx];

  // Detect columns
  const colSr    = findCol(headerRow, ['sr no', 'sr.no', 'srno', 's.no', 'sno', 'no.', 'no ']);
  const colName  = findCol(headerRow, ['product name', 'product', 'name', 'medicine']);
  const colGen   = findCol(headerRow, ['generic name', 'generic', 'composition', 'ingredient', 'salt', 'content', 'formula']);
  const colPack  = findCol(headerRow, ['pack', 'packing', 'qty', 'quantity', 'size']);

  // For price: try to pick MRP column (usually labelled "mrp" or last numeric price col)
  // Prevego has: Pack | PTS | MRP | HSN — so MRP is after PTS
  const colMrp   = findCol(headerRow, ['mrp', 'msp', 'retail price', 'm.r.p']);
  // If no MRP label found, look for second numeric-price column
  let mrpColFinal = colMrp;
  if (mrpColFinal === -1) {
    // Find all columns that look like price columns
    const priceCols = headerRow
      .map((h, i) => ({ h: String(h || '').toLowerCase().trim(), i }))
      .filter(({ h }) => h.includes('price') || h.includes('rate') || h.includes('pts') || h === 'mrp');
    if (priceCols.length >= 2) mrpColFinal = priceCols[priceCols.length - 1].i;
    else if (priceCols.length === 1) mrpColFinal = priceCols[0].i;
  }

  console.log(`\n📋  Column mapping:`);
  console.log(`    Sr No.       → col ${colSr}`);
  console.log(`    Product Name → col ${colName}`);
  console.log(`    Generic Name → col ${colGen}`);
  console.log(`    Pack         → col ${colPack}`);
  console.log(`    MRP          → col ${mrpColFinal}`);

  if (colName === -1) {
    console.error('\n❌  Could not find "Product Name" column. Check your header row.\n');
    process.exit(1);
  }

  const products = [];
  let currentCategory = 'General';
  let idCounter = 1;

  for (let i = headerRowIdx + 1; i < rows.length; i++) {
    const row = rows[i];

    // Skip fully blank rows
    const nonEmpty = row.filter((c) => c !== '' && c !== null && c !== undefined);
    if (nonEmpty.length === 0) continue;

    // Detect category banner
    if (isCategoryRow(row)) {
      currentCategory = extractCategory(row);
      console.log(`\n   📂  Category: ${currentCategory}`);
      continue;
    }

    // Skip rows where Sr No is not numeric (company headers, titles, etc.)
    if (colSr !== -1) {
      const srVal = String(row[colSr] || '').trim();
      if (srVal && !/^\d+$/.test(srVal)) continue; // non-numeric Sr → skip
    }

    const name = String(row[colName] || '').trim();
    if (!name || name.toLowerCase() === 'product name') continue;

    // MRP
    const mrpRaw = mrpColFinal !== -1
      ? String(row[mrpColFinal] || '').replace(/[^0-9.]/g, '')
      : '0.00';
    const mrp = mrpRaw ? parseFloat(mrpRaw).toFixed(2) : '0.00';

    // Pack
    const pack = colPack !== -1 ? String(row[colPack] || '').trim() : '';

    // Generic Name / Composition
    const compositionRaw = colGen !== -1 ? String(row[colGen] || '').trim() : '';
    // Split by '+' or ',' for multi-ingredient
    const composition = compositionRaw
      ? compositionRaw.split(/\s*\+\s*/).map((s) => s.trim()).filter(Boolean)
      : [];

    products.push({
      id: idCounter++,
      name,
      brand: companyName,
      category: currentCategory,
      description: `${name} — ${companyName} pharmaceutical product.`,
      image: DEFAULT_IMAGE,
      pack,
      mrp,
      composition,
    });
  }

  return products;
}

// ── Main ──────────────────────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('\n❌  Usage: node scripts/import-products.cjs <excel-file> [company-name] [--append]\n');
    console.error('   Example: node scripts/import-products.cjs Prevego.xlsx "Prevego"');
    console.error('   Example: node scripts/import-products.cjs Alkem.xlsx "Alkem" --append\n');
    process.exit(1);
  }

  const inputArg   = args.find((a) => !a.startsWith('--'));
  const companyArg = args.filter((a) => !a.startsWith('--'))[1] || 'Unknown';
  const appendMode = args.includes('--append');

  const inputPath = path.resolve(process.cwd(), inputArg);
  if (!fs.existsSync(inputPath)) {
    console.error(`\n❌  File not found: ${inputPath}\n`);
    process.exit(1);
  }

  console.log(`\n📂  File    : ${inputPath}`);
  console.log(`🏢  Company : ${companyArg}`);
  console.log(`📝  Mode    : ${appendMode ? 'APPEND (adds to existing products)' : 'OVERWRITE (replaces products.json)'}`);

  const workbook  = XLSX.readFile(inputPath);
  const sheetName = workbook.SheetNames[0];
  const sheet     = workbook.Sheets[sheetName];
  console.log(`📋  Sheet   : "${sheetName}"`);

  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });

  if (rows.length < 2) {
    console.error('\n❌  Sheet is empty or has no data.\n');
    process.exit(1);
  }

  const headerRowIdx = findHeaderRow(rows);
  if (headerRowIdx === -1) {
    console.error('\n❌  Could not find a header row with "Product Name" or "Sr No."\n');
    console.error('    Make sure the first row with column names contains "Product Name".\n');
    process.exit(1);
  }
  console.log(`🔍  Header row found at row ${headerRowIdx + 1}`);

  const newProducts = parseSheet(rows, companyArg, headerRowIdx);

  if (newProducts.length === 0) {
    console.error('\n❌  No valid products were found. Check the file structure.\n');
    process.exit(1);
  }

  // In append mode, merge with existing products
  let finalProducts = newProducts;
  if (appendMode && fs.existsSync(OUTPUT_PATH)) {
    const existing = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
    // Remove products for this company if re-importing (avoid duplicates)
    const filtered = existing.filter((p) => p.brand !== companyArg);
    finalProducts = [
      ...filtered,
      ...newProducts.map((p, i) => ({ ...p, id: filtered.length + i + 1 })),
    ];
    console.log(`\n🔗  Merged: ${filtered.length} existing + ${newProducts.length} new = ${finalProducts.length} total`);
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(finalProducts, null, 2), 'utf-8');

  // Summary
  const byCategory = {};
  newProducts.forEach((p) => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });

  console.log('\n\n✅  Import complete!');
  console.log(`    Products imported : ${newProducts.length}`);
  console.log(`    Output file       : src/data/products.json`);
  console.log('\n📊  Products by category:');
  Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      const bar = '█'.repeat(Math.min(Math.round(count / 5), 20));
      console.log(`    ${cat.padEnd(35)} ${String(count).padStart(4)}  ${bar}`);
    });

  console.log('\n🚀  Next steps:');
  console.log('    1. Check src/data/products.json to verify the output');
  console.log('    2. git add . && git commit -m "Import products from Excel"');
  console.log('    3. git push  →  Vercel redeploys automatically\n');
}

main();
