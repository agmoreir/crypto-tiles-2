import axios from 'axios';
import { CryptoData } from '../types/crypto.types';

const API_URL = 'https://api.coingecko.com/api/v3';

export class ApiService {
    private static instance: ApiService;

    private constructor() {}

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    async getTop100Coins(): Promise<CryptoData[]> {
        try {
            const response = await axios.get(`${API_URL}/coins/markets`, {
                params: {
                    vs_currency: 'usd',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: false,
                    price_change_percentage: '24h,7d,30d'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            throw error;
        }
    }
}