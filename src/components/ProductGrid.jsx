import React from 'react';
import ProductCard from './ProductCard';
import { PackageX } from 'lucide-react';

const ProductGrid = ({ products, onProductClick }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="bg-gray-50 p-6 rounded-full mb-4">
          <PackageX className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 max-w-md">
          We couldn't find any products matching your current filters. Try adjusting your search or clearing filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onClick={() => onProductClick(product)} 
        />
      ))}
    </div>
  );
};

export default ProductGrid;
