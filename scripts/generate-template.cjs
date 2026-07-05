#!/usr/bin/env node
/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Prisha Pharma — Generate Sample Excel Template
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * USAGE:
 *   node scripts/generate-template.js
 *
 * Creates: products-template.xlsx in the project root
 * Send this file to your client to fill with their product data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const XLSX = require('xlsx');
const path = require('path');

const OUTPUT = path.join(__dirname, '..', 'products-template.xlsx');

const headers = [
  'Product Name',
  'Company',
  'Category',
  'Pack',
  'MRP',
  'Composition',
  'Description',
  'Image',
];

const sampleData = [
  ['Amlodipine Tablet', 'Sun Pharma',     'Tablets',     '10×10', 45.00, 'Amlodipine Besylate 5mg',                               'Calcium channel blocker for hypertension.',                       ''],
  ['Amlodipine Tablet', 'Sun Pharma',     'Tablets',     '10×10', 65.00, 'Amlodipine Besylate 10mg',                              'Higher strength for uncontrolled hypertension.',                   ''],
  ['Amlodipine Tablet', 'Cipla',          'Tablets',     '10×10', 48.00, 'Amlodipine Besylate 5mg',                               'Cipla variant — same molecule, different manufacturer.',           ''],
  ['Amoxicillin',       'Alkem',          'Capsules',    '10×10', 85.00, 'Amoxicillin 500mg',                                     'Broad-spectrum penicillin antibiotic.',                            ''],
  ['Co-Amoxiclav',      'Alkem',          'Tablets',     '6×1×6', 125.00,'Amoxicillin 500mg + Clavulanate Potassium 125mg',        'Beta-lactamase resistant antibiotic combination.',                 ''],
  ['Paracetamol',       'Sun Pharma',     'Tablets',     '10×10', 12.50, 'Paracetamol 500mg',                                     'Analgesic and antipyretic for fever and pain.',                    ''],
  ['Cetirizine',        'Cipla',          'Tablets',     '10×10', 22.00, 'Cetirizine Hydrochloride 10mg',                         'Second-generation antihistamine for allergy relief.',              ''],
  ['Zinc Syrup',        'Cipla',          'Syrups',      '60 ml', 65.00, 'Zinc Sulphate Monohydrate 20mg/5ml',                    'Zinc supplement for children.',                                    ''],
  ['Calcium + D3',      'Torrent Pharma', 'Nutritional', '10×10', 95.00, 'Calcium Carbonate 500mg + Vitamin D3 250 IU',           'Combined supplement for bone health.',                             ''],
  ['Pantoprazole',      'Torrent Pharma', 'Tablets',     '10×10', 42.00, 'Pantoprazole Sodium 40mg',                              'Proton pump inhibitor for acid reflux and GERD.',                  ''],
];

const wb = XLSX.utils.book_new();
const wsData = [headers, ...sampleData];
const ws = XLSX.utils.aoa_to_sheet(wsData);

// Column widths
ws['!cols'] = [
  { wch: 28 }, // Product Name
  { wch: 18 }, // Company
  { wch: 14 }, // Category
  { wch: 10 }, // Pack
  { wch: 10 }, // MRP
  { wch: 52 }, // Composition
  { wch: 52 }, // Description
  { wch: 40 }, // Image
];

XLSX.utils.book_append_sheet(wb, ws, 'Products');
XLSX.writeFile(wb, OUTPUT);

console.log(`\n✅  Template created: products-template.xlsx`);
console.log('    Send this file to your client to fill in their product data.');
console.log('    Once filled, run: node scripts/import-products.js products-template.xlsx\n');
