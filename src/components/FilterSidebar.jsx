import React from 'react';
import { X, Filter } from 'lucide-react';

const FilterSidebar = ({
  isOpen,
  onClose,
  brands,
  categories,
  salts,
  selectedBrand,
  onSelectBrand,
  selectedCategory,
  onSelectCategory,
  selectedSalt,
  onSelectSalt,
  sortOption,
  onSortChange,
  onClearFilters
}) => {

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white">
      {/* Mobile Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100 lg:hidden">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Filter className="h-5 w-5" /> Filters
        </h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
        {/* Sort */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 uppercase text-xs tracking-wider">Sort Products</h3>
          <select 
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="default">Default</option>
            <option value="a-z">Name: A to Z</option>
            <option value="z-a">Name: Z to A</option>
          </select>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 uppercase text-xs tracking-wider">Categories</h3>
          <div className="space-y-2">
            <button 
              onClick={() => onSelectCategory('')}
              className={`block w-full text-left text-sm py-1.5 ${selectedCategory === '' ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              All Categories
            </button>
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => onSelectCategory(cat)}
                className={`block w-full text-left text-sm py-1.5 ${selectedCategory === cat ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Brands */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 uppercase text-xs tracking-wider">Brands</h3>
          <div className="space-y-2">
            <button 
              onClick={() => onSelectBrand('')}
              className={`block w-full text-left text-sm py-1.5 ${selectedBrand === '' ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              All Brands
            </button>
            {brands.map((brand, idx) => (
              <button 
                key={idx}
                onClick={() => onSelectBrand(brand.name)}
                className={`block w-full text-left text-sm py-1.5 ${selectedBrand === brand.name ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>

        {/* Salts */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4 uppercase text-xs tracking-wider">Salt / Composition</h3>
          <div className="space-y-2">
            <button 
              onClick={() => onSelectSalt('')}
              className={`block w-full text-left text-sm py-1.5 ${selectedSalt === '' ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
            >
              All Salts
            </button>
            {salts.map((salt, idx) => (
              <button 
                key={idx}
                onClick={() => onSelectSalt(salt)}
                className={`block w-full text-left text-sm py-1.5 ${selectedSalt === salt ? 'text-primary font-medium' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {salt}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={onClearFilters}
          className="w-full py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:shadow-none lg:w-64 lg:z-auto lg:border-r lg:border-gray-100
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {sidebarContent}
      </aside>
    </>
  );
};

export default FilterSidebar;
