import React from 'react';
import SearchBar from './SearchBar';
import agencyData from '../data/agency.json';

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top banner row — logo left | green title right */}
      <div className="flex items-stretch bg-primary min-h-[68px]">

        {/* White logo box — no clip-path, clean solid block */}
        <div className="flex items-center justify-center bg-white px-4 md:px-6 flex-shrink-0 min-w-[140px] md:min-w-[200px]">
          <img
            src={agencyData.logo}
            alt={agencyData.name}
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
          />
        </div>

        {/* Green title area */}
        <div className="flex-1 flex items-center px-5 md:px-8">
          <span className="text-white text-lg sm:text-xl md:text-3xl font-bold tracking-wide">
            Product Catalogue
          </span>
        </div>

      </div>

      {/* Search bar row */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-2.5">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>
      </div>
    </header>
  );
};

export default Header;
