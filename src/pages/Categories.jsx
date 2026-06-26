import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Activity, Stethoscope, Droplet, Microscope } from 'lucide-react';
import categoriesData from '../data/categories.json';

// Mapping icons to categories dynamically
const categoryIcons = [Pill, Activity, Stethoscope, Droplet, Microscope];

const Categories = () => {
  return (
    <div className="pt-8 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Categories</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our comprehensive range of pharmaceutical products categorized for your convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoriesData.map((category, idx) => {
            const Icon = categoryIcons[idx % categoryIcons.length];
            return (
              <Link 
                key={idx} 
                to={`/products?category=${encodeURIComponent(category)}`}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 group hover:-translate-y-1 text-center"
              >
                <div className="w-16 h-16 bg-green-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{category}</h3>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
