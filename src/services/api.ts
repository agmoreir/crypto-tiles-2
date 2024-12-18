import axios from 'axios';
import { CryptoData } from '../types/crypto';

const API_URL = 'https://api.coingecko.com/api/v3';

export const fetchCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: true,
        price_change_percentage: '1h,4h,24h,7d,30d'
      }
    });

    // Transform the data to avoid Symbol() issues
    return response.data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      market_cap_rank: coin.market_cap_rank,
      total_volume: coin.total_volume,
      price_change_percentage_1h: coin.price_change_percentage_1h_in_currency,
      price_change_percentage_4h: coin.price_change_percentage_4h_in_currency,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      price_change_percentage_7d: coin.price_change_percentage_7d_in_currency,
      price_change_percentage_30d: coin.price_change_percentage_30d_in_currency,
      sparkline_in_7d: {
        price: coin.sparkline_in_7d?.price || []
      }
    }));
  } catch (error) {
    console.error('Error fetching crypto data:', error);
    throw new Error('Failed to fetch crypto data');
  }
};