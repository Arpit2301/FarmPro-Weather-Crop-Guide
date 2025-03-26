
// Weather API key - In a production app, this would be stored in environment variables
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  name: string;
}

export interface ForecastData {
  list: {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    visibility: number;
    dt_txt: string;
  }[];
  city: {
    name: string;
    country: string;
  };
}

// Fetch current weather by city name
export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

// Fetch 5-day forecast by city name
export const fetchForecastByCity = async (city: string): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch forecast data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Get user's location using browser geolocation API
export const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Fetch weather by coordinates
export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

// Fetch forecast by coordinates
export const fetchForecastByCoords = async (lat: number, lon: number): Promise<ForecastData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch forecast data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};
