import React from 'react';

/**
 * Constrained Marquee — each item appears ONCE on screen.
 * Track = 200% of container. Items = 100% / (2 * rowLength) each.
 * Animation translates by -50% (= one full set width = 100% container).
 */
const BrandSection = ({ brands, selectedBrand, onSelectBrand }) => {
  const half = Math.ceil(brands.length / 2);
  const row1 = brands.slice(0, half);   // e.g. 4 items
  const row2 = brands.slice(half);      // e.g. 4 items

  const renderBrand = (brand, key, rowLen) => (
    <button
      key={key}
      onClick={() => onSelectBrand(selectedBrand === brand.name ? '' : brand.name)}
      style={{ flex: `0 0 calc(100% / ${rowLen * 2})` }}
      className={`px-2 py-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-center h-20 bg-white ${
        selectedBrand === brand.name
          ? 'border-primary ring-2 ring-primary/20 shadow-md'
          : 'border-gray-100 hover:border-primary/40 hover:shadow-sm'
      }`}
    >
      <img
        src={brand.logo}
        alt={brand.name}
        className="max-w-[80%] max-h-[60px] object-contain pointer-events-none"
        loading="lazy"
      />
    </button>
  );

  return (
    <div className="py-6 border-b border-gray-100 bg-white">
      {/* Centered heading */}
      <div className="text-center mb-4">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Brands</h2>
        <div className="w-10 h-0.5 bg-primary mx-auto mt-1.5 rounded-full"></div>
      </div>

      {/* Constrained to same width as content below */}
      <div className="container mx-auto px-4 md:px-8 space-y-3">

        {/* Row 1 — slides LEFT */}
        <div className="overflow-hidden w-full">
          <div
            className="marquee-track marquee-track-left"
            style={{ width: '200%', display: 'flex' }}
          >
            {[...row1, ...row1].map((brand, idx) =>
              renderBrand(brand, `r1-${idx}`, row1.length)
            )}
          </div>
        </div>

        {/* Row 2 — slides RIGHT */}
        <div className="overflow-hidden w-full">
          <div
            className="marquee-track marquee-track-right"
            style={{ width: '200%', display: 'flex' }}
          >
            {[...row2, ...row2].map((brand, idx) =>
              renderBrand(brand, `r2-${idx}`, row2.length)
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BrandSection;
