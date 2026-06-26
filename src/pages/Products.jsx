import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import brandsData from '../data/brands.json';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Parse URL query params for initial filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryQuery = params.get('category');
    const brandQuery = params.get('brand');
    
    if (categoryQuery) setSelectedCategory(categoryQuery);
    if (brandQuery) setSelectedBrand(brandQuery);
  }, [location]);

  // Filtering Logic
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    
    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header & Mobile Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
            <p className="text-gray-600">Showing {filteredProducts.length} results</p>
          </div>
          <button 
            className="md:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-md border border-gray-200 shadow-sm"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Filter className="h-5 w-5" /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:shadow-none md:bg-transparent md:w-64 shrink-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="p-6 md:p-0 h-full overflow-y-auto">
              <div className="flex justify-between items-center md:hidden mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsSidebarOpen(false)}>
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Search */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search medicines..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setSelectedCategory('All')}
                      className={`text-sm ${selectedCategory === 'All' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}
                    >
                      All Categories
                    </button>
                  </li>
                  {categoriesData.map((cat, idx) => (
                    <li key={idx}>
                      <button 
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-sm text-left ${selectedCategory === cat ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => setSelectedBrand('All')}
                      className={`text-sm ${selectedBrand === 'All' ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}
                    >
                      All Brands
                    </button>
                  </li>
                  {brandsData.map((brand, idx) => (
                    <li key={idx}>
                      <button 
                        onClick={() => setSelectedBrand(brand.name)}
                        className={`text-sm text-left ${selectedBrand === brand.name ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`}
                      >
                        {brand.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Overlay for mobile sidebar */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-xl border border-gray-200">
                <p className="text-xl text-gray-600">No products found matching your criteria.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedBrand('All'); }}
                  className="mt-4 text-primary font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
