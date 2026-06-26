import React from 'react';
import ProductCard from './ProductCard';
import { PackageX } from 'lucide-react';

/**
 * Catalogue-style shelf grid.
 * Products are grouped by category.
 * Each category = one shelf row, separated by a visual shelf divider.
 */
const CatalogueGrid = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="bg-gray-50 p-6 rounded-full mb-4">
          <PackageX className="h-12 w-12 text-gray-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-700 mb-1">No products found</h3>
        <p className="text-sm text-gray-400">Try adjusting your search or filters.</p>
      </div>
    );
  }

  // Group products by category
  const grouped = products.reduce((acc, product) => {
    const cat = product.category || 'Other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  return (
    <div className="space-y-0">
      {Object.entries(grouped).map(([category, items], groupIdx) => (
        <div key={category}>
          {/* Shelf row */}
          <div className="py-5 px-4 md:px-8">
            {/* Category label */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{category}</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>

            {/* Product grid — 4 per row, centered */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {items.map((product) => (
                <div key={product.id} className="w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] md:w-[calc(25%-9px)]">
                  <ProductCard
                    product={product}
                    onClick={() => onProductClick(product)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Shelf divider */}
          <div className="h-3 bg-gray-100 border-y border-gray-200"></div>
        </div>
      ))}
    </div>
  );
};

export default CatalogueGrid;
