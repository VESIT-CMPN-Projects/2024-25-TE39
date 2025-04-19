
import React from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning, Wind } from 'lucide-react';

interface WeatherCardProps {
  date: string;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy' | 'windy';
  humidity: number;
  windSpeed: number;
  location:string
  precipitation: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  date,
  temp,
  condition,
  humidity,
  windSpeed,
  precipitation,
  location
}) => {
  const getWeatherIcon = () => {
    switch (condition) {
      case 'sunny':
        return <Sun className="h-10 w-10 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-10 w-10 text-gray-400" />;
      case 'rainy':
        return <CloudRain className="h-10 w-10 text-blue-400" />;
      case 'snowy':
        return <CloudSnow className="h-10 w-10 text-blue-200" />;
      case 'stormy':
        return <CloudLightning className="h-10 w-10 text-purple-500" />;
      case 'windy':
        return <Wind className="h-10 w-10 text-teal-400" />;
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />;
    }
  };

  const getConditionColor = () => {
    switch (condition) {
      case 'sunny':
        return 'from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20';
      case 'cloudy':
        return 'from-gray-100 to-blue-100 dark:from-gray-900/20 dark:to-blue-900/20';
      case 'rainy':
        return 'from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20';
      case 'snowy':
        return 'from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10';
      case 'stormy':
        return 'from-purple-100 to-gray-100 dark:from-purple-900/20 dark:to-gray-900/20';
      case 'windy':
        return 'from-teal-100 to-blue-100 dark:from-teal-900/20 dark:to-blue-900/20';
      default:
        return 'from-blue-50 to-indigo-50';
    }
  };

  return (
    <div className={`  text-black rounded-xl p-5 card-hover bg-gradient-to-br ${getConditionColor()} backdrop-blur-sm border border-white/20 shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{date}</p>
          <h3 className="text-2xl font-bold">{temp}°C</h3>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{date}</p>
          <h3 className="text-2xl font-bold">{location}°C</h3>
        </div>
        <div className="flex items-center justify-center p-2 bg-white/30 dark:bg-black/20 rounded-full">
          {getWeatherIcon()}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Humidity</p>
          <p className="font-medium">{humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Wind</p>
          <p className="font-medium">{windSpeed} km/h</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Rain</p>
          <p className="font-medium">{precipitation}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
