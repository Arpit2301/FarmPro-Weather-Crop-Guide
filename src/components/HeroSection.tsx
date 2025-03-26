
import React, { useEffect, useState } from 'react';
import { CloudSun, MapPin } from 'lucide-react';
import LocationSearch from './LocationSearch';

interface HeroSectionProps {
  currentWeather: any;
  location: string;
  onLocationChange: (location: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  currentWeather, 
  location, 
  onLocationChange 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentWeather) {
      setIsLoading(false);
    }
  }, [currentWeather]);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'evening';
  };

  const getWeatherEmoji = () => {
    if (!currentWeather) return '🌤️';
    
    const weatherId = currentWeather.weather[0].id;
    
    if (weatherId >= 200 && weatherId < 300) return '⛈️'; // Thunderstorm
    if (weatherId >= 300 && weatherId < 500) return '🌧️'; // Drizzle
    if (weatherId >= 500 && weatherId < 600) return '🌧️'; // Rain
    if (weatherId >= 600 && weatherId < 700) return '❄️'; // Snow
    if (weatherId >= 700 && weatherId < 800) return '🌫️'; // Atmosphere
    if (weatherId === 800) return '☀️'; // Clear
    return '☁️'; // Clouds
  };

  const getGreeting = () => {
    const timeOfDay = getTimeOfDay();
    return `Good ${timeOfDay}, farmer`;
  };

  return (
    <section className="relative min-h-[80vh] flex items-center py-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-farm-sky-light/30 to-white/10 -z-10"></div>
      
      {/* Floating elements */}
      <div className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full bg-farm-green/10 animate-float"></div>
      <div className="absolute bottom-[20%] left-[10%] w-24 h-24 rounded-full bg-farm-earth/10 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[60%] right-[20%] w-16 h-16 rounded-full bg-farm-sky/10 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-entrance" style={{ animationDelay: '0.1s' }}>
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-farm-earth-dark mb-4">
                {getGreeting()}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Get real-time weather updates and crop recommendations for your farm
              </p>
            </div>
            
            <div className="flex items-center text-sm md:text-base">
              <MapPin className="h-5 w-5 mr-2 text-farm-earth" />
              <span>{location || 'Loading location...'}</span>
            </div>
            
            <LocationSearch onLocationSelect={onLocationChange} />
          </div>
          
          <div className="weather-card animate-entrance" style={{ animationDelay: '0.3s' }}>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-16 h-16 border-4 border-farm-green border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-muted-foreground">Loading weather data...</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-muted-foreground mb-1">Current Weather</p>
                    <h3 className="text-3xl font-bold flex items-center">
                      <span>{currentWeather?.main?.temp.toFixed(1)}°C</span>
                      <span className="ml-2 text-4xl">{getWeatherEmoji()}</span>
                    </h3>
                    <p className="mt-1 capitalize text-muted-foreground">
                      {currentWeather?.weather?.[0]?.description || 'Unknown'}
                    </p>
                  </div>
                  <CloudSun className="h-12 w-12 text-farm-sky" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Humidity</p>
                    <p className="text-xl font-medium">{currentWeather?.main?.humidity}%</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm text-muted-foreground mb-1">Wind</p>
                    <p className="text-xl font-medium">{currentWeather?.wind?.speed} m/s</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-secondary/50 col-span-2 md:col-span-1">
                    <p className="text-sm text-muted-foreground mb-1">Pressure</p>
                    <p className="text-xl font-medium">{currentWeather?.main?.pressure} hPa</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
