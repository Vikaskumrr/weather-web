import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import './App.css';

const API_KEY = 'b2380d584f87410b9f2151059240410';

const App: React.FC = () => {
  const [value, setValue] = useState<string>(() => {
    const storedValue = localStorage.getItem('location');
    return storedValue ? storedValue : 'Delhi';
  });
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${value}&days=1`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [value]);

  useEffect(() => {
    localStorage.setItem('location', value);
  }, [value]);

  const getSuggestions = async (value: string) => {
    value = value ? value : 'delhi';
    const response = await axios.get(
      `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${value}`
    );
    return response.data.map((location: any) => location.name);
  };

  const onSuggestionsFetchRequested = async ({ value }: any) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event: any, { suggestionValue }: any) => {
    setValue(suggestionValue);
  };

  const onClearInput = () => {
    setValue('');
  };

  const renderSuggestion = (suggestion: string) => (
    <div className="suggestion-item">{suggestion}</div>
  );

  return (
    <div className="weather-app">
      <h1>Today's weather</h1>
      <div className="input-container">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Enter a location',
            value,
            onChange: (_: any, { newValue }: any) => setValue(newValue),
            onFocus: () => setIsSuggestionsOpen(true),
            onBlur: () => setIsSuggestionsOpen(false),
          }}
          shouldRenderSuggestions={() => isSuggestionsOpen}
        />
        {value && (
          <button className="clear-button" onClick={onClearInput}>
            <span>&times;</span>
          </button>
        )}
      </div>
      {weatherData ? (
        <div className="data-container">
          <h2>{weatherData.location.name}</h2>
          <p>Current Temperature: {weatherData.current.temp_c}°C</p>
          <p>
            High Temperature: {weatherData.forecast.forecastday[0].day.maxtemp_c}°C
          </p>
          <p>
            Low Temperature: {weatherData.forecast.forecastday[0].day.mintemp_c}°C
          </p>
          <p>Condition: {weatherData.current.condition.text}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
