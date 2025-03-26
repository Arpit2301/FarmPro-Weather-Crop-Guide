
import React from 'react';
import { getCropRecommendations } from '../utils/cropUtils';
import { WeatherData } from '../utils/weatherUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface CropRecommendationsProps {
  currentWeather: WeatherData;
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ currentWeather }) => {
  if (!currentWeather) {
    return (
      <div className="weather-card h-64 flex items-center justify-center">
        <p>Loading crop recommendations...</p>
      </div>
    );
  }
  
  // Get recommendations using the utility function
  const recommendedCrops = getCropRecommendations(currentWeather);
  
  return (
    <section id="crops" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="section-title text-2xl font-bold mb-4">Recommended Crops</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Based on the current weather conditions in your area, here are some crops that would grow well:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedCrops.map((crop, index) => (
            <div 
              key={crop.name} 
              className="crop-card flex flex-col h-full animate-entrance border border-border rounded-xl overflow-hidden shadow-sm" 
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="p-4 flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold">{crop.name}</h3>
                  <div className="px-2 py-1 bg-farm-green/10 text-farm-green rounded-full text-sm font-medium">
                    {crop.confidence}% match
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{crop.description}</p>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Ideal Growing Conditions:</h4>
                  <Table className="w-full">
                    <TableBody>
                      <TableRow>
                        <TableCell className="py-1 text-xs font-medium">Temperature:</TableCell>
                        <TableCell className="py-1 text-xs">{crop.idealConditions.temperature}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1 text-xs font-medium">Humidity:</TableCell>
                        <TableCell className="py-1 text-xs">{crop.idealConditions.humidity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="py-1 text-xs font-medium">Rainfall:</TableCell>
                        <TableCell className="py-1 text-xs">{crop.idealConditions.rainfall}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                {crop.tips.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Growing Tips:</h4>
                    <ul className="list-disc pl-5 text-xs text-muted-foreground">
                      {crop.tips.slice(0, 2).map((tip, i) => (
                        <li key={i} className="mb-1">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CropRecommendations;
