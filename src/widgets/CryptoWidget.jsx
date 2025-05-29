import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';

const CryptoWidget = () => {
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/crypto/top')
            .then(res => {
                console.log("Fetched coins:", res.data);
                setCoins(res.data);
            })
            .catch(err => {
                console.error('Failed to fetch crypto data:', err);
                setError('Error loading crypto data.');
            });
    }, []);

    return (
        <div className="widget crypto-widget">
            <div className="widget-header">Top Crypto</div>
            <div className="widget-content">
                {error && <p>{error}</p>}
                {!error && coins.length === 0 && <p>Loading...</p>}
                <ul>
                    {coins.map((coin, idx) => (
                        <li key={idx}>
                            {coin.name} - $
                            {coin.current_price
                                ? coin.current_price.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })
                                : 'N/A'}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CryptoWidget;
