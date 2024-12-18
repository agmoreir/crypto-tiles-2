import React from 'react';
import { CryptoData } from '../types';
import { SparklineChart } from './SparklineChart';

interface Props {
  data: CryptoData;
  x: number;
  y: number;
}

export const BubbleTooltip: React.FC<Props> = ({ data, x, y }) => {
  const priceChanges = [
    { label: '1h', value: data.price_change_percentage_1h },
    { label: '4h', value: data.price_change_percentage_4h },
    { label: '24h', value: data.price_change_percentage_24h }
  ];

  return (
    <div 
      className="absolute z-50 bg-gray-800 p-4 rounded-lg shadow-lg text-white"
      style={{
        left: x + 10,
        top: y - 10,
        transform: 'translate(-50%, -100%)',
        pointerEvents: 'none',
        minWidth: '250px'
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <img src={data.image} alt={data.name} className="w-6 h-6" />
        <span className="font-bold">{data.name} ({data.symbol.toUpperCase()})</span>
        <span className="text-gray-400 text-sm">#{data.market_cap_rank}</span>
      </div>

      {data.sparkline_in_7d?.price && (
        <div className="mb-3">
          <SparklineChart 
            data={data.sparkline_in_7d.price} 
            color={data.price_change_percentage_24h > 0 ? '#4CAF50' : '#F44336'}
          />
        </div>
      )}

      <div className="space-y-1 text-sm">
        <p>Price: ${data.current_price.toLocaleString()}</p>
        <p>Market Cap: ${(data.market_cap / 1e9).toFixed(2)}B</p>
        <p>Volume: ${(data.total_volume / 1e9).toFixed(2)}B</p>
        
        <div className="flex gap-4 mt-2">
          {priceChanges.map(({ label, value }) => (
            <div key={label} className={value && value > 0 ? 'text-green-400' : 'text-red-400'}>
              {label}: {value?.toFixed(1)}%
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};