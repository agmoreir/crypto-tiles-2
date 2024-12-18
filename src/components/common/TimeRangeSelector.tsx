import React from 'react';
import { TimeRange } from '../../types';

interface TimeRangeSelectorProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  selectedRange,
  onRangeChange,
}) => {
  const ranges: TimeRange[] = ['24h', '7d', '30d', '1y'];

  return (
    <div className="flex justify-center space-x-4 mb-6">
      {ranges.map((range) => (
        <button
          key={range}
          className={`px-4 py-2 rounded-lg ${
            selectedRange === range
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => onRangeChange(range)}
        >
          {range}
        </button>
      ))}
    </div>
  );
};