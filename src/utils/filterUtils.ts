import { CryptoData } from '../types';

export const filterCryptoData = (
  data: CryptoData[],
  marketCapRange: number,
  searchTerm: string
): CryptoData[] => {
  const slicedData = data.slice(0, marketCapRange);
  
  if (!searchTerm) {
    return slicedData;
  }

  const term = searchTerm.toLowerCase();
  return slicedData.filter(coin => 
    coin.name.toLowerCase().includes(term) || 
    coin.symbol.toLowerCase().includes(term)
  );
};