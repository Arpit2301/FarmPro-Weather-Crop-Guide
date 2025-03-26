
import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onLocationSelect(searchValue.trim());
      setSearchValue('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for a location..."
          className="w-full py-3 px-5 pr-12 rounded-full border border-border bg-white/80 focus:border-farm-green focus:ring-2 focus:ring-farm-green/20 transition-all duration-200 outline-none"
        />
        <button 
          type="submit" 
          className="absolute right-1 top-1 h-9 w-9 rounded-full bg-farm-green text-white flex items-center justify-center hover:bg-farm-green-dark transition-colors duration-200"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default LocationSearch;
