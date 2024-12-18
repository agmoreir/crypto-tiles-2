import React from 'react';
import { TimeRange } from '../../types/crypto';

interface Props {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export const TimeRangeSelector: React.FC<Props> = ({ selectedRange, onRangeChange }) => {
  const ranges: TimeRange[] = ['24h', '7d', '30d'];

  return (
    <div className="flex gap-2">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => onRangeChange(range)}
          className={`px-3 py-1 rounded-lg transition-colors ${
            selectedRange === range
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
};