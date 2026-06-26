import React, { useState } from 'react';

const Gallery = () => {
  const [filter, setFilter] = useState('All');

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Office' },
    { src: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Warehouse' },
    { src: 'https://images.unsplash.com/photo-1616423640778-28d1b53229bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Warehouse' },
    { src: 'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Delivery' },
    { src: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Products' },
    { src: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', category: 'Products' },
  ];

  const filteredImages = filter === 'All' ? galleryImages : galleryImages.filter(img => img.category === filter);
  const categories = ['All', 'Office', 'Warehouse', 'Delivery', 'Products'];

  return (
    <div className="pt-8 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-2xl shadow-sm aspect-video">
              <img 
                src={img.src} 
                alt={img.category} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-semibold text-lg tracking-wider bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
