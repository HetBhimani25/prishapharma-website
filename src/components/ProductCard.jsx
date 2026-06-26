import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative h-48 overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold text-primary">
          {product.category}
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded text-gray-700">
            {product.pack}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
