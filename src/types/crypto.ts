export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_1h?: number;
  price_change_percentage_4h?: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d?: number;
  price_change_percentage_30d?: number;
  sparkline_in_7d?: {
    price: number[];
  };
}

export type TimeRange = '24h' | '7d' | '30d';