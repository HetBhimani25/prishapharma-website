import React from 'react';
import { Link } from 'react-router-dom';
import brandsData from '../data/brands.json';
import BrandCard from '../components/BrandCard';

const Brands = () => {
  return (
    <div className="pt-8 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Partner Brands</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We are proud to distribute products from some of the most trusted and globally recognized pharmaceutical manufacturers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandsData.map((brand, idx) => (
            <Link key={idx} to={`/products?brand=${encodeURIComponent(brand.name)}`} className="block">
              <BrandCard brand={brand} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
