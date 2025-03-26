
import React from 'react';
import { CloudSun, Thermometer, CloudRain } from 'lucide-react';

interface WeatherDisplayProps {
  currentWeather: any;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ currentWeather }) => {
  if (!currentWeather) {
    return (
      <div className="weather-card h-64 flex items-center justify-center">
        <p>Loading weather data...</p>
      </div>
    );
  }

  const getWeatherIcon = (weatherId: number) => {
    if (weatherId >= 200 && weatherId < 600) {
      return <CloudRain className="h-8 w-8 text-farm-sky" />;
    } else if (weatherId === 800) {
      return <div className="h-8 w-8 rounded-full bg-farm-sky/90"></div>;
    } else {
      return <CloudSun className="h-8 w-8 text-farm-sky" />;
    }
  };

  return (
    <section id="weather" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="section-title">Current Weather</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="weather-card animate-entrance" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold mb-1">
                  {currentWeather.main.temp.toFixed(1)}°C
                </h3>
                <p className="text-lg capitalize text-muted-foreground">
                  {currentWeather.weather[0].description}
                </p>
              </div>
              <div className="p-3 rounded-full bg-secondary/50">
                {getWeatherIcon(currentWeather.weather[0].id)}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-5 w-5 text-farm-earth" />
                <div>
                  <p className="text-sm text-muted-foreground">Feels like</p>
                  <p className="font-medium">{currentWeather.main.feels_like.toFixed(1)}°C</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CloudRain className="h-5 w-5 text-farm-earth" />
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-medium">{currentWeather.main.humidity}%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="weather-card animate-entrance" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-semibold mb-4">Weather Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Wind Speed</span>
                <span className="font-medium">{currentWeather.wind.speed} m/s</span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Pressure</span>
                <span className="font-medium">{currentWeather.main.pressure} hPa</span>
              </div>
              
              <div className="flex items-center justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Visibility</span>
                <span className="font-medium">{(currentWeather.visibility / 1000).toFixed(1)} km</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cloudiness</span>
                <span className="font-medium">{currentWeather.clouds.all}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherDisplay;
