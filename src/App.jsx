import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CatalogueGrid from './components/CatalogueGrid';
import ProductModal from './components/ProductModal';

import productsData from './data/products.json';
import categoriesData from './data/categories.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.salt && p.salt.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    return result;
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Category filter strip — constrained to same width as catalogue */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setSelectedCategory('')}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
              selectedCategory === ''
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
            }`}
          >
            All
          </button>
          {categoriesData.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main catalogue — centered white card */}
      <main className="flex-1 flex justify-center py-6 px-4">
        <div className="w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
          <CatalogueGrid
            products={filteredProducts}
            onProductClick={setSelectedProduct}
          />
        </div>
      </main>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;
