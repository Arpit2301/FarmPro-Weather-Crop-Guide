
import React from 'react';
import { Sun } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sun className="h-8 w-8 text-farm-green animate-pulse-soft" />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-farm-earth-dark to-farm-green bg-clip-text text-transparent">
            FarmPro
          </h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-1 md:space-x-4">
            <li>
              <a 
                href="#weather" 
                className="px-3 py-2 text-sm md:text-base rounded-md hover:bg-secondary transition-colors duration-200"
              >
                Weather
              </a>
            </li>
            <li>
              <a 
                href="#crops" 
                className="px-3 py-2 text-sm md:text-base rounded-md hover:bg-secondary transition-colors duration-200"
              >
                Crops
              </a>
            </li>
            <li>
              <a 
                href="#forecast" 
                className="px-3 py-2 text-sm md:text-base rounded-md hover:bg-secondary transition-colors duration-200"
              >
                Forecast
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
