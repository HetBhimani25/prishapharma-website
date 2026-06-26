import React from 'react';

/**
 * Catalogue-style product card — matches the PDF layout.
 * Just the medicine box image in a clean bordered box. Minimal text below.
 */
const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 flex flex-col"
    >
      {/* Product Image */}
      <div className="relative bg-gray-50 flex items-center justify-center p-3 h-36 sm:h-40 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-400"
          loading="lazy"
        />
      </div>

      {/* Minimal Info */}
      <div className="px-3 py-2 border-t border-gray-100 bg-white">
        <p className="text-[11px] font-bold text-primary uppercase tracking-wide truncate">{product.brand}</p>
        <p className="text-sm font-semibold text-gray-800 truncate leading-snug">{product.name}</p>
        <p className="text-[11px] text-gray-400 truncate">{product.strength} &bull; {product.pack}</p>
      </div>
    </div>
  );
};

export default ProductCard;
