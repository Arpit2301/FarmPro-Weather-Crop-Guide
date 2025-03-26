
import { WeatherData } from './weatherUtils';

export interface CropRecommendation {
  name: string;
  confidence: number; // 0-100
  description: string;
  idealConditions: {
    temperature: string;
    humidity: string;
    rainfall: string;
  };
  tips: string[];
}

// Simple algorithm to recommend crops based on weather
export const getCropRecommendations = (weather: WeatherData): CropRecommendation[] => {
  const { temp } = weather.main;
  const { humidity } = weather.main;
  const isRainy = weather.weather[0].main.toLowerCase().includes('rain');
  
  const allCrops: CropRecommendation[] = [
    {
      name: 'Wheat',
      confidence: 0,
      description: 'A versatile grain crop that forms the staple food in many regions.',
      idealConditions: {
        temperature: '15-24°C',
        humidity: '50-70%',
        rainfall: 'Moderate'
      },
      tips: [
        'Plant during cool seasons for best results',
        'Ensure good drainage to prevent root diseases',
        'Apply nitrogen fertilizer at key growth stages'
      ]
    },
    {
      name: 'Rice',
      confidence: 0,
      description: 'A major food staple and the most important crop in many tropical regions.',
      idealConditions: {
        temperature: '20-30°C',
        humidity: '80-100%',
        rainfall: 'High'
      },
      tips: [
        'Requires standing water during most of growing season',
        'Transplant seedlings for better yields',
        'Maintain proper water levels throughout growth'
      ]
    },
    {
      name: 'Corn (Maize)',
      confidence: 0,
      description: 'A versatile grain used for food, feed, and industrial products.',
      idealConditions: {
        temperature: '18-32°C',
        humidity: '60-80%',
        rainfall: 'Moderate to high'
      },
      tips: [
        'Plant when soil temperature reaches at least 10°C',
        'Space properly for optimal pollination',
        'Apply fertilizer based on soil test results'
      ]
    },
    {
      name: 'Potatoes',
      confidence: 0,
      description: 'A starchy tuber that is among the world\'s most important food crops.',
      idealConditions: {
        temperature: '15-20°C',
        humidity: '60-80%',
        rainfall: 'Moderate'
      },
      tips: [
        'Plant certified disease-free seed potatoes',
        'Hill soil around plants as they grow',
        'Ensure consistent moisture for uniform tuber growth'
      ]
    },
    {
      name: 'Tomatoes',
      confidence: 0,
      description: 'A popular fruit (botanically) grown worldwide for culinary use.',
      idealConditions: {
        temperature: '20-27°C',
        humidity: '50-70%',
        rainfall: 'Low to moderate'
      },
      tips: [
        'Provide support for vining varieties',
        'Prune suckers for indeterminate varieties',
        'Water at base to prevent leaf diseases'
      ]
    },
    {
      name: 'Lettuce',
      confidence: 0,
      description: 'A leafy green vegetable popular in salads and sandwiches.',
      idealConditions: {
        temperature: '10-22°C',
        humidity: '50-70%',
        rainfall: 'Low to moderate'
      },
      tips: [
        'Plant in succession for continuous harvest',
        'Provide partial shade in hot weather',
        'Harvest in morning for best quality'
      ]
    },
    {
      name: 'Soybeans',
      confidence: 0,
      description: 'A legume grown for its edible bean and oil content.',
      idealConditions: {
        temperature: '20-30°C',
        humidity: '60-80%',
        rainfall: 'Moderate to high'
      },
      tips: [
        'Inoculate seeds with rhizobium bacteria',
        'Plant when soil temperature is at least 13°C',
        'Rotate with non-legume crops'
      ]
    },
    {
      name: 'Barley',
      confidence: 0,
      description: 'A major cereal grain used in bread, beverages, and animal feed.',
      idealConditions: {
        temperature: '12-20°C',
        humidity: '50-70%',
        rainfall: 'Low to moderate'
      },
      tips: [
        'Plant early in spring for best yields',
        'Choose appropriate variety for your region',
        'Apply nitrogen fertilizer judiciously'
      ]
    }
  ];
  
  // Calculate confidence scores based on current weather
  return allCrops.map(crop => {
    let confidenceScore = 0;
    
    // Temperature check
    const [minTemp, maxTemp] = crop.idealConditions.temperature.split('-').map(t => parseInt(t));
    if (temp >= minTemp && temp <= maxTemp) {
      confidenceScore += 40; // Temperature is very important
    } else if (temp >= minTemp - 3 && temp <= maxTemp + 3) {
      confidenceScore += 20; // Close to ideal temperature
    }
    
    // Humidity check
    const [minHumidity, maxHumidity] = crop.idealConditions.humidity.split('-').map(h => parseInt(h));
    if (humidity >= minHumidity && humidity <= maxHumidity) {
      confidenceScore += 30; // Humidity is important
    } else if (humidity >= minHumidity - 10 && humidity <= maxHumidity + 10) {
      confidenceScore += 15; // Close to ideal humidity
    }
    
    // Rainfall check (simplified)
    const rainfallPreference = crop.idealConditions.rainfall.toLowerCase();
    if (
      (isRainy && rainfallPreference.includes('high')) ||
      (isRainy && rainfallPreference.includes('moderate')) ||
      (!isRainy && rainfallPreference.includes('low'))
    ) {
      confidenceScore += 30; // Rainfall preference matches
    } else if (
      (isRainy && rainfallPreference.includes('low')) ||
      (!isRainy && rainfallPreference.includes('high'))
    ) {
      confidenceScore -= 10; // Rainfall preference contradicts
    }
    
    // Special case for rice which really loves water
    if (crop.name === 'Rice' && isRainy) {
      confidenceScore += 20;
    }
    
    // Cap at 100
    confidenceScore = Math.min(100, Math.max(0, confidenceScore));
    
    return {
      ...crop,
      confidence: confidenceScore
    };
  })
  .sort((a, b) => b.confidence - a.confidence)
  .slice(0, 5); // Return top 5 recommendations
};
