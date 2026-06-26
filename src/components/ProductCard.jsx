import React from 'react';
import { Package, Pill, ExternalLink } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group cursor-pointer flex flex-col h-full"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-white border-b border-gray-50 flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-gray-50 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-600 border border-gray-200">
          {product.category}
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-1">
          <span className="text-xs font-bold text-primary tracking-wide uppercase">{product.brand}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">{product.description}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <Pill className="h-3.5 w-3.5 text-primary" />
            <span className="truncate">{product.strength}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100">
            <Package className="h-3.5 w-3.5 text-primary" />
            <span className="truncate">{product.pack}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center w-full py-2.5 bg-gray-50 text-sm font-medium text-gray-700 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors gap-2">
          View Details <ExternalLink className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
