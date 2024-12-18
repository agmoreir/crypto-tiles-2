import { CATEGORY_COINS, CATEGORIES } from '../constants';

export const assignCategory = (coin: { symbol: string }): string => {
  const symbol = coin.symbol.toLowerCase();
  
  for (const [category, symbols] of Object.entries(CATEGORY_COINS)) {
    if (symbols.includes(symbol)) {
      return category;
    }
  }
  
  return CATEGORIES.OTHER;
};