import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { MdArticle, MdSearch } from 'react-icons/md';

const NewsWidget = () => {
    const [topic, setTopic] = useState(''); // Current search term
    const [input, setInput] = useState(''); // Input field value
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    // Fetch articles for a topic
    const fetchNews = (searchTopic) => {
        if (!searchTopic) return;
        api.get(`/news?topic=${encodeURIComponent(searchTopic)}`)
            .then(res => {
                console.log(`Fetched news for "${searchTopic}":`, res.data);
                setArticles(res.data.articles || res.data); // adapt to your response
                setError(null);
            })
            .catch(err => {
                console.error('News fetch failed:', err);
                setError('Could not load news.');
            });
    };

    // Try to get user's city on initial load
    useEffect(() => {
        fetch('https://ipapi.co/json') // or ipinfo.io/json
            .then(res => res.json())
            .then(data => {
                const city = data.city || 'technology';
                setTopic(city);
                setInput(city);
                fetchNews(city);
            })
            .catch(() => {
                setTopic('technology');
                setInput('technology');
                fetchNews('technology');
            });
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        setTopic(input);
        fetchNews(input);
    };

    return (
        <div className="widget news-widget">
            <div className="widget-header">
                <div className="widget-title">Top News</div>
                <div className="widget-icon"><MdArticle /></div>
            </div>

            <form onSubmit={handleSearch} className="news-search">
                <input
                    type="text"
                    placeholder="Search topic..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type="submit" title="Search"><MdSearch /></button>
            </form>

            <div className="widget-content">
                {error && <p>{error}</p>}
                {!error && articles.length === 0 && <p>Loading...</p>}
                <ul>
                    {articles.slice(0, 5).map((item, idx) => (
                        <li key={idx}>
                            <a href={item.link || item.url} target="_blank" rel="noreferrer">
                                {item.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default NewsWidget;
