import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { MdSearch, MdWbSunny } from 'react-icons/md';

const WeatherWidget = () => {
    const [city, setCity] = useState('');
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = (cityName) => {
        if (!cityName) return;
        api.get(`/weather?city=${encodeURIComponent(cityName)}`)
            .then(res => {
                console.log(`Fetched weather for "${cityName}":`, res.data);
                setWeather(res.data);
                setError(null);
            })
            .catch(err => {
                console.error('Weather fetch failed:', err);
                setWeather(null);
                setError('Could not load weather.');
            });
    };

    useEffect(() => {
        fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(data => {
                const userCity = data.city || 'New York';
                setCity(userCity);
                setInput(userCity);
                fetchWeather(userCity);
            })
            .catch(() => {
                const fallback = 'New York';
                setCity(fallback);
                setInput(fallback);
                fetchWeather(fallback);
            });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setCity(input);
        fetchWeather(input);
    };

    return (
        <div className="widget weather-widget">
            <div className="widget-header">
                <div className="widget-title">Weather</div>
                <div className="widget-icon"><MdWbSunny /></div>
            </div>

            <form onSubmit={handleSearch} className="weather-search">
                <input
                    type="text"
                    placeholder="Enter city..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" title="Search"><MdSearch /></button>
            </form>

            <div className="widget-content">
                {error && <p>{error}</p>}
                {!weather && !error && <p>Loading...</p>}
                {weather && (
                    <ul>
                        <li><strong>City:</strong> {weather.city}</li>
                        <li><strong>Temperature:</strong> {weather.temperature}°C</li>
                        <li><strong>Condition:</strong> {weather.condition}</li>
                        <li><strong>Humidity:</strong> {weather.humidity}%</li>
                        <li><strong>Wind:</strong> {weather.windSpeed} km/h</li>
                    </ul>
                )}
            </div>
        </div>
    );
};

export default WeatherWidget;
