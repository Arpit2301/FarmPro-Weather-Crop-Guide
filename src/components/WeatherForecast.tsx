
import React from 'react';
import { Calendar } from 'lucide-react';

interface ForecastDay {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

interface WeatherForecastProps {
  forecast: {
    list: ForecastDay[];
  } | null;
}

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }) => {
  if (!forecast) {
    return (
      <div className="weather-card h-64 flex items-center justify-center">
        <p>Loading forecast data...</p>
      </div>
    );
  }
  
  // Process the forecast data to get daily forecasts (noon forecast for each day)
  const dailyForecasts = forecast.list.filter((item, index) => index % 8 === 4).slice(0, 5);
  
  const formatDay = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
  };
  
  const getWeatherIcon = (weatherId: number) => {
    if (weatherId >= 200 && weatherId < 300) return '⛈️';
    if (weatherId >= 300 && weatherId < 500) return '🌧️';
    if (weatherId >= 500 && weatherId < 600) return '🌧️';
    if (weatherId >= 600 && weatherId < 700) return '❄️';
    if (weatherId >= 700 && weatherId < 800) return '🌫️';
    if (weatherId === 800) return '☀️';
    return '☁️';
  };

  return (
    <section id="forecast" className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="h-6 w-6 text-farm-green" />
          <h2 className="section-title">5-Day Forecast</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {dailyForecasts.map((day, index) => (
            <div 
              key={day.dt} 
              className="weather-card animate-entrance"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="text-center">
                <p className="text-muted-foreground mb-1">{formatDay(day.dt)}</p>
                <div className="text-5xl my-3">
                  {getWeatherIcon(day.weather[0].id)}
                </div>
                <h3 className="text-2xl font-bold mb-1">{day.main.temp.toFixed(1)}°C</h3>
                <p className="capitalize text-sm text-muted-foreground">
                  {day.weather[0].description}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border flex justify-between">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Min</p>
                  <p className="font-medium">{day.main.temp_min.toFixed(1)}°C</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Max</p>
                  <p className="font-medium">{day.main.temp_max.toFixed(1)}°C</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeatherForecast;
