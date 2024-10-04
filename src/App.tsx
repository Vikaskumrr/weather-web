import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'b2380d584f87410b9f2151059240410';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Noida`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      {weatherData ? (
        <div>
          <h2>{weatherData.location.name}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
