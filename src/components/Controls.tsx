import React from 'react';
import { CryptoData, TimeRange } from '../types/crypto';
import { getPriceChange } from '../utils/priceUtils';
import { findTopGainer, findTopLoser } from '../utils/marketUtils';

interface Props {
  timeRange: TimeRange;
  marketCapRange: number;
  searchTerm: string;
  onTimeRangeChange: (range: TimeRange) => void;
  onMarketCapRangeChange: (range: number) => void;
  onSearchChange: (term: string) => void;
  onReset: () => void;
  data: CryptoData[];
}

export const Controls: React.FC<Props> = ({
  timeRange,
  marketCapRange,
  searchTerm,
  onTimeRangeChange,
  onMarketCapRangeChange,
  onSearchChange,
  onReset,
  data,
}) => {
  const topGainer = findTopGainer(data, timeRange);
  const topLoser = findTopLoser(data, timeRange);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          {/* Market Cap Range Selector */}
          <select
            value={marketCapRange}
            onChange={(e) => onMarketCapRangeChange(Number(e.target.value))}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={25}>Top 25</option>
            <option value={50}>Top 50</option>
            <option value={100}>Top 100</option>
          </select>

          {/* Time Range Buttons */}
          <div className="flex gap-2">
            {(['24h', '7d', '30d'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => onTimeRangeChange(range)}
                className={`px-3 py-1 rounded-lg transition-colors ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Top Gainers and Losers */}
          {topGainer && topLoser && (
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
          )}
        </div>

        <div className="flex gap-4 items-center">
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search coins..."
            className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Reset Button */}
          <button
            onClick={onReset}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};