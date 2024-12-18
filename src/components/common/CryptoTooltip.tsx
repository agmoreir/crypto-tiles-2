import React from 'react';
import { CryptoData, TimeRange } from '../../types';

interface CryptoTooltipProps {
  data: CryptoData;
  timeRange: TimeRange;
}

export const CryptoTooltip: React.FC<CryptoTooltipProps> = ({ data, timeRange }) => {
  const getPriceChange = () => {
    switch (timeRange) {
      case '7d':
        return data.price_change_percentage_7d;
      case '30d':
        return data.price_change_percentage_30d;
      case '1y':
        return data.price_change_percentage_1y;
      default:
        return data.price_change_percentage_24h;
    }
  };

  const priceChange = getPriceChange();

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-2 mb-2">
        <img src={data.image} alt={data.name} className="w-6 h-6" />
        <h3 className="font-bold">{data.name} ({data.symbol.toUpperCase()})</h3>
      </div>
      <div className="space-y-1 text-sm">
        <p>Price: ${data.current_price.toLocaleString()}</p>
        <p>Market Cap: ${(data.market_cap / 1e9).toFixed(2)}B</p>
        <p>Volume: ${(data.total_volume / 1e9).toFixed(2)}B</p>
        <p className={`${priceChange && priceChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {timeRange} Change: {priceChange?.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};