
import React from 'react';

interface Crop {
  name: string;
  description: string;
  idealTemp: string;
  idealHumidity: string;
  image: string;
}

interface CropRecommendationsProps {
  currentWeather: any;
}

const CropRecommendations: React.FC<CropRecommendationsProps> = ({ currentWeather }) => {
  if (!currentWeather) {
    return (
      <div className="weather-card h-64 flex items-center justify-center">
        <p>Loading crop recommendations...</p>
      </div>
    );
  }
  
  const recommendCrops = (): Crop[] => {
    const temp = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const isRainy = currentWeather.weather[0].main.toLowerCase().includes('rain');
    
    const allCrops: Crop[] = [
      {
        name: 'Wheat',
        description: 'A versatile grain crop that thrives in moderate temperatures.',
        idealTemp: '15-24°C',
        idealHumidity: '50-70%',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1c5a1ec21?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Rice',
        description: 'A water-loving crop ideal for high humidity and rainfall.',
        idealTemp: '20-30°C',
        idealHumidity: '80-100%',
        image: 'https://images.unsplash.com/photo-1559684983-d3d1d713f65a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Corn',
        description: 'A warm-season crop that requires good sunlight and moderate water.',
        idealTemp: '18-32°C',
        idealHumidity: '60-80%',
        image: 'https://images.unsplash.com/photo-1601591549978-c3f4b89fea02?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Potatoes',
        description: 'A versatile tuber that grows well in cooler temperatures.',
        idealTemp: '15-20°C',
        idealHumidity: '60-80%',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Tomatoes',
        description: 'A warm-season fruit that requires good sunlight and moderate water.',
        idealTemp: '20-27°C',
        idealHumidity: '50-70%',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Lettuce',
        description: 'A cool-season leafy vegetable ideal for mild temperatures.',
        idealTemp: '10-22°C',
        idealHumidity: '50-70%',
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Soybeans',
        description: 'A protein-rich legume that thrives in warm conditions.',
        idealTemp: '20-30°C',
        idealHumidity: '60-80%',
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Barley',
        description: 'A cereal grain that grows well in cool to moderate conditions.',
        idealTemp: '12-20°C',
        idealHumidity: '50-70%',
        image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
      }
    ];
    
    // Simple recommendation logic based on temperature and humidity
    return allCrops.filter(crop => {
      const [minTemp, maxTemp] = crop.idealTemp.split('-').map(t => parseInt(t));
      const [minHumidity, maxHumidity] = crop.idealHumidity.split('-').map(h => parseInt(h));
      
      const isGoodTemp = temp >= minTemp && temp <= maxTemp;
      const isGoodHumidity = humidity >= minHumidity && humidity <= maxHumidity;
      
      // Special case for rice which loves rainy conditions
      if (crop.name === 'Rice' && isRainy) return true;
      
      return isGoodTemp && isGoodHumidity;
    }).slice(0, 4); // Return top 4 recommendations
  };
  
  const recommendedCrops = recommendCrops();
  
  return (
    <section id="crops" className="py-16 px-6">
      <div className="container mx-auto">
        <h2 className="section-title">Recommended Crops</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
          Based on the current weather conditions in your area, here are some crops that would grow well:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedCrops.map((crop, index) => (
            <div 
              key={crop.name} 
              className="crop-card flex flex-col h-full animate-entrance" 
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div 
                className="h-48 rounded-xl mb-4 bg-cover bg-center" 
                style={{ backgroundImage: `url(${crop.image})` }}
              ></div>
              <h3 className="text-xl font-semibold mb-2">{crop.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{crop.description}</p>
              <div className="mt-auto grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Ideal Temp</p>
                  <p className="font-medium">{crop.idealTemp}</p>
                </div>
                <div className="p-2 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground">Ideal Humidity</p>
                  <p className="font-medium">{crop.idealHumidity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CropRecommendations;
