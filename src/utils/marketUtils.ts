import { CryptoData, TimeRange } from '../types/crypto';
import { getPriceChange } from './priceUtils';

export const calculateTotalMarketCap = (data: CryptoData[]): number => {
  return data.reduce((sum, coin) => sum + coin.market_cap, 0);
};

export const calculateTotalVolume = (data: CryptoData[]): number => {
  return data.reduce((sum, coin) => sum + coin.total_volume, 0);
};

export const calculateBTCDominance = (data: CryptoData[]): number => {
  const totalMarketCap = calculateTotalMarketCap(data);
  return (data[0]?.market_cap / totalMarketCap) * 100 || 0;
};

export const findTopGainer = (data: CryptoData[], timeRange: TimeRange): CryptoData | null => {
  if (!data.length) return null;
  return data.reduce((max, coin) => {
    const maxChange = getPriceChange(max, timeRange);
    const currentChange = getPriceChange(coin, timeRange);
    return currentChange > maxChange ? coin : max;
  });
};

export const findTopLoser = (data: CryptoData[], timeRange: TimeRange): CryptoData | null => {
  if (!data.length) return null;
  return data.reduce((min, coin) => {
    const minChange = getPriceChange(min, timeRange);
    const currentChange = getPriceChange(coin, timeRange);
    return currentChange < minChange ? coin : min;
  });
};