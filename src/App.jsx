import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import BrandSection from './components/BrandSection';
import CategorySection from './components/CategorySection';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import { Filter } from 'lucide-react';

// Data
import productsData from './data/products.json';
import brandsData from './data/brands.json';
import categoriesData from './data/categories.json';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSalt, setSelectedSalt] = useState('');
  const [sortOption, setSortOption] = useState('default');
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique salts from products
  const salts = useMemo(() => {
    const uniqueSalts = new Set(productsData.map(p => p.salt).filter(Boolean));
    return Array.from(uniqueSalts).sort();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // Search filter (name, brand, category, salt)
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(lowerSearch) ||
        p.brand.toLowerCase().includes(lowerSearch) ||
        p.category.toLowerCase().includes(lowerSearch) ||
        (p.salt && p.salt.toLowerCase().includes(lowerSearch))
      );
    }

    // Brand filter
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Salt filter
    if (selectedSalt) {
      result = result.filter(p => p.salt === selectedSalt);
    }

    // Sorting
    if (sortOption === 'a-z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'z-a') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // Default sort (by ID)
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [searchTerm, selectedBrand, selectedCategory, selectedSalt, sortOption]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedBrand('');
    setSelectedCategory('');
    setSelectedSalt('');
    setSortOption('default');
    setIsMobileFilterOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />

      <main className="flex-1">
        <BrandSection 
          brands={brandsData}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
        />
        
        <CategorySection 
          categories={categoriesData}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <div className="container mx-auto px-4 md:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            <FilterSidebar 
              isOpen={isMobileFilterOpen}
              onClose={() => setIsMobileFilterOpen(false)}
              brands={brandsData}
              categories={categoriesData}
              salts={salts}
              selectedBrand={selectedBrand}
              onSelectBrand={setSelectedBrand}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedSalt={selectedSalt}
              onSelectSalt={setSelectedSalt}
              sortOption={sortOption}
              onSortChange={setSortOption}
              onClearFilters={clearFilters}
            />

            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {searchTerm ? 'Search Results' : 'All Products'}
                  <span className="text-sm font-normal text-gray-500 ml-2">({filteredProducts.length})</span>
                </h1>
                
                <button 
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm"
                >
                  <Filter className="h-4 w-4" /> Filters
                </button>
              </div>

              <ProductGrid 
                products={filteredProducts} 
                onProductClick={setSelectedProduct} 
              />
            </div>

          </div>
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
