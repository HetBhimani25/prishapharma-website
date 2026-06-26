import React from 'react';
import SearchBar from './SearchBar';
import agencyData from '../data/agency.json';

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center gap-4 md:gap-8">

        {/* Logo — bigger, left aligned */}
        <a href="/" className="flex-shrink-0">
          <img
            src={agencyData.logo}
            alt={agencyData.name}
            className="h-14 sm:h-16 md:h-20 w-auto object-contain"
          />
        </a>

        {/* Search — fills remaining space */}
        <div className="flex-1">
          <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
        </div>

      </div>
    </header>
  );
};

export default Header;
