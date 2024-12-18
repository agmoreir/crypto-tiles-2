import { CryptoData, TimeRange } from '../types/crypto';

export const getPriceChange = (data: CryptoData, timeRange: TimeRange): number => {
  switch (timeRange) {
    case '7d':
      return data.price_change_percentage_7d || 0;
    case '30d':
      return data.price_change_percentage_30d || 0;
    default:
      return data.price_change_percentage_24h || 0;
  }
};