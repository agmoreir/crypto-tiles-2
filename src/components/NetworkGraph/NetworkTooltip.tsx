import React from 'react';
import { CryptoData, TimeRange } from '../../types/crypto';
import { getPriceChange } from '../../utils/priceUtils';
import { SparklineChart } from './SparklineChart';

interface Props {
  data: CryptoData;
  timeRange: TimeRange;
  x: number;
  y: number;
}

export const NetworkTooltip: React.FC<Props> = ({ data, timeRange, x, y }) => {
  const priceChange = getPriceChange(data, timeRange);
  const sparklineColor = priceChange > 0 ? '#4CAF50' : '#F44336';
  
  return (
    <div 
      className="absolute z-50 bg-gray-800 p-4 rounded-lg shadow-lg text-white"
      style={{
        left: x + 10,
        top: y - 10,
        transform: 'translate(-50%, -100%)',
        pointerEvents: 'none',
        minWidth: '200px'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <img src={data.image} alt={data.name} className="w-6 h-6" />
        <span className="font-bold">{data.name} ({data.symbol.toUpperCase()})</span>
      </div>
      {data.sparkline_in_7d?.price && (
        <div className="mb-3">
          <SparklineChart 
            data={data.sparkline_in_7d.price} 
            width={180} 
            height={40}
            color={sparklineColor}
          />
        </div>
      )}
      <div className="space-y-1 text-sm">
        <p>Price: ${data.current_price.toLocaleString()}</p>
        <p>Market Cap: ${(data.market_cap / 1e9).toFixed(2)}B</p>
        <p>Volume: ${(data.total_volume / 1e9).toFixed(2)}B</p>
        <p className={priceChange > 0 ? 'text-green-400' : 'text-red-400'}>
          {timeRange} Change: {priceChange.toFixed(2)}%
        </p>
        <p className="text-gray-400">Category: {data.category}</p>
      </div>
    </div>
  );
};