
import React from 'react';
import { Sun } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-farm-earth-dark text-white py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sun className="h-6 w-6 text-farm-green-light" />
              <h2 className="text-xl font-bold">FarmPro</h2>
            </div>
            <p className="text-farm-earth-light text-sm">
              A farmer-friendly web application providing real-time weather updates and
              crop recommendations based on local climate conditions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-farm-earth-light text-sm">
              <li>
                <a href="#" className="hover:text-farm-green-light transition-colors">Home</a>
              </li>
              <li>
                <a href="#weather" className="hover:text-farm-green-light transition-colors">Weather</a>
              </li>
              <li>
                <a href="#crops" className="hover:text-farm-green-light transition-colors">Crop Recommendations</a>
              </li>
              <li>
                <a href="#forecast" className="hover:text-farm-green-light transition-colors">Forecast</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Data Sources</h3>
            <p className="text-farm-earth-light text-sm mb-4">
              Weather data provided by OpenWeather API.
              Crop recommendations based on agricultural research and climate data.
            </p>
            <p className="text-farm-earth-light text-sm">
              © {new Date().getFullYear()} FarmPro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
