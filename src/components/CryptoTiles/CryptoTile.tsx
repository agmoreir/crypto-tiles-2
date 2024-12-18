import React from 'react';
import { CryptoData, TimeRange } from '../../types/crypto';
import { getPriceChange } from '../../utils/priceUtils';
import { SparklineChart } from '../SparklineChart';

interface Props {
  data: CryptoData;
  timeRange: TimeRange;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export const CryptoTile: React.FC<Props> = ({
  data,
  timeRange,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const priceChange = getPriceChange(data, timeRange);
  const isPositive = priceChange > 0;

  return (
    <div
      className={`
        relative p-4 rounded-lg cursor-pointer transition-all duration-200
        hover:transform hover:scale-105 hover:z-10
        ${isPositive ? 'bg-green-900/20' : 'bg-red-900/20'}
        border-2 ${isPositive ? 'border-green-500/30' : 'border-red-500/30'}
      `}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <img src={data.image} alt={data.name} className="w-6 h-6" />
        <span className="font-bold text-white">{data.symbol.toUpperCase()}</span>
        <span className="text-xs text-gray-400">#{data.market_cap_rank}</span>
      </div>
      
      {data.sparkline_in_7d?.price && (
        <div className="h-12 mb-2">
          <SparklineChart
            data={data.sparkline_in_7d.price}
            color={isPositive ? '#4CAF50' : '#F44336'}
          />
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-300">
          ${data.current_price.toLocaleString()}
        </span>
        <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {priceChange.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};