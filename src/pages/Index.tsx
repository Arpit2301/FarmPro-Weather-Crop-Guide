
import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import WeatherDisplay from '../components/WeatherDisplay';
import WeatherForecast from '../components/WeatherForecast';
import CropRecommendations from '../components/CropRecommendations';
import Footer from '../components/Footer';
import { 
  fetchWeatherByCity, 
  fetchForecastByCity,
  getUserLocation,
  fetchWeatherByCoords,
  fetchForecastByCoords
} from '../utils/weatherUtils';

const Index = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Try to get user's location when component mounts
    const loadInitialData = async () => {
      try {
        // Try to get user's location
        const coords = await getUserLocation();
        const weatherData = await fetchWeatherByCoords(coords.lat, coords.lon);
        const forecastData = await fetchForecastByCoords(coords.lat, coords.lon);
        
        setCurrentWeather(weatherData);
        setForecast(forecastData);
        setLocation(weatherData.name);
        
        toast.success(`Weather data loaded for ${weatherData.name}`);
      } catch (error) {
        console.error("Couldn't get location, using default:", error);
        
        // Fall back to a default location
        handleLocationChange('London');
        
        toast.error("Couldn't access your location. Using default location.");
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);
  
  const handleLocationChange = async (newLocation: string) => {
    if (!newLocation) return;
    
    setLoading(true);
    
    try {
      const weatherData = await fetchWeatherByCity(newLocation);
      const forecastData = await fetchForecastByCity(newLocation);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      setLocation(weatherData.name);
      
      toast.success(`Weather data updated for ${weatherData.name}`);
    } catch (error) {
      console.error('Error fetching data for location:', error);
      toast.error(`Couldn't find weather data for "${newLocation}"`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <HeroSection 
          currentWeather={currentWeather} 
          location={location}
          onLocationChange={handleLocationChange}
        />
        
        <WeatherDisplay currentWeather={currentWeather} />
        
        <WeatherForecast forecast={forecast} />
        
        <CropRecommendations currentWeather={currentWeather} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
