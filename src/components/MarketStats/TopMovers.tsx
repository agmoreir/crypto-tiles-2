import React from 'react';
import { CryptoData, TimeRange } from '../../types/crypto';
import { getPriceChange } from '../../utils/priceUtils';

interface Props {
  topGainer: CryptoData | null;
  topLoser: CryptoData | null;
  timeRange: TimeRange;
}

export const TopMovers: React.FC<Props> = ({ topGainer, topLoser, timeRange }) => {
  if (!topGainer || !topLoser) return null;

  return (
    <div className="flex gap-4">
      <div className="text-sm">
        <span className="text-gray-400">Top Gainer: </span>
        <span className="text-green-400">
          {topGainer.symbol.toUpperCase()} ({getPriceChange(topGainer, timeRange).toFixed(2)}%)
        </span>
      </div>
      <div className="text-sm">
        <span className="text-gray-400">Top Loser: </span>
        <span className="text-red-400">
          {topLoser.symbol.toUpperCase()} ({getPriceChange(topLoser, timeRange).toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};