import React from 'react';

const BrandCard = ({ brand }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center justify-center h-32 cursor-pointer group">
      <img
        src={brand.logo}
        alt={brand.name}
        className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
        loading="lazy"
      />
    </div>
  );
};

export default BrandCard;
