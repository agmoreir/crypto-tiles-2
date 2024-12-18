import React from 'react';
import { CryptoData, TimeRange } from '../../types/crypto';
import { getPriceChange } from '../../utils/priceUtils';

interface Props {
  data: CryptoData;
  timeRange: TimeRange;
  x: number;
  y: number;
}

export const TileTooltip: React.FC<Props> = ({ data, timeRange, x, y }) => {
  const priceChange = getPriceChange(data, timeRange);
  
  return (
    <div 
      className="fixed z-50 bg-gray-800 p-4 rounded-lg shadow-lg text-white"
      style={{
        left: x + 100,
        bottom: window.innerHeight - y + 10,
        transform: 'translate(-50%, 0)',
        pointerEvents: 'none',
        minWidth: '250px'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <img src={data.image} alt={data.name} className="w-6 h-6" />
        <span className="font-bold">{data.name}</span>
        <span className="text-gray-400 text-sm">#{data.market_cap_rank}</span>
      </div>

      <div className="space-y-1 text-sm">
        <p>Price: ${data.current_price.toLocaleString()}</p>
        <p>Market Cap: ${(data.market_cap / 1e9).toFixed(2)}B</p>
        <p>Volume: ${(data.total_volume / 1e9).toFixed(2)}B</p>
        
        <div className="flex flex-col gap-1 mt-2">
          <p className={data.price_change_percentage_1h > 0 ? 'text-green-400' : 'text-red-400'}>
            1h: {data.price_change_percentage_1h?.toFixed(2)}%
          </p>
          <p className={data.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}>
            24h: {data.price_change_percentage_24h?.toFixed(2)}%
          </p>
        </div>

        {data.sparkline_in_7d?.price && (
          <div className="mt-2">
            <p className="text-gray-400 text-xs mb-1">7d Price Graph</p>
          </div>
        )}
        
        <p className="text-gray-400 mt-2 text-xs italic">
          Click for more details on CoinGecko
        </p>
      </div>
    </div>
  );
};