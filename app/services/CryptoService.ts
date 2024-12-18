import axios from 'axios';

export class CryptoService {
    private static instance: CryptoService;
    private readonly API_URL = 'https://api.coingecko.com/api/v3';

    private constructor() {}

    public static getInstance(): CryptoService {
        if (!CryptoService.instance) {
            CryptoService.instance = new CryptoService();
        }
        return CryptoService.instance;
    }

    async getTop100Coins() {
        try {
            const response = await axios.get(
                `${this.API_URL}/coins/markets`,
                {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 100,
                        page: 1,
                        sparkline: false
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching crypto data:', error);
            throw error;
        }
    }
}