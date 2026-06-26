import React from 'react';

/**
 * Constrained Marquee — each category appears ONCE on screen.
 * Track = 200% of container. Items = 100% / (2 * rowLength) each.
 */
const CategorySection = ({ categories, selectedCategory, onSelectCategory }) => {
  const allItems = [
    { name: 'All Products', isAll: true },
    ...categories.map(c => ({ name: c, isAll: false }))
  ];

  const half = Math.ceil(allItems.length / 2);
  const row1 = allItems.slice(0, half);
  const row2 = allItems.slice(half);

  const renderChip = (item, key, rowLen) => {
    const isActive = item.isAll ? selectedCategory === '' : selectedCategory === item.name;
    return (
      <div
        key={key}
        style={{ flex: `0 0 calc(100% / ${rowLen * 2})` }}
        className="px-1 flex items-center justify-center"
      >
        <button
          onClick={() => onSelectCategory(item.isAll ? '' : (selectedCategory === item.name ? '' : item.name))}
          className={`w-full px-3 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 text-sm border ${
            isActive
              ? 'bg-primary text-white border-primary shadow-md shadow-primary/30'
              : 'bg-gray-50 text-gray-700 hover:bg-primary/10 hover:border-primary/40 border-gray-200'
          }`}
        >
          {item.name}
        </button>
      </div>
    );
  };

  return (
    <div className="py-6 border-b border-gray-100 bg-white">
      {/* Centered heading */}
      <div className="text-center mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Categories</h2>
        <div className="w-10 h-0.5 bg-primary mx-auto mt-1.5 rounded-full"></div>
      </div>

      {/* Constrained to same width as content below */}
      <div className="container mx-auto px-4 md:px-8 space-y-3">

        {/* Row 1 — slides LEFT */}
        <div className="overflow-hidden w-full">
          <div
            className="marquee-track marquee-track-cat-left"
            style={{ width: '200%', display: 'flex' }}
          >
            {[...row1, ...row1].map((item, idx) =>
              renderChip(item, `r1-${idx}`, row1.length)
            )}
          </div>
        </div>

        {/* Row 2 — slides RIGHT */}
        <div className="overflow-hidden w-full">
          <div
            className="marquee-track marquee-track-cat-right"
            style={{ width: '200%', display: 'flex' }}
          >
            {[...row2, ...row2].map((item, idx) =>
              renderChip(item, `r2-${idx}`, row2.length)
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CategorySection;
