import React from 'react';

type MarketCapRange = '25' | '50' | '100';

interface Props {
  selectedRange: MarketCapRange;
  onRangeChange: (range: MarketCapRange) => void;
}

export const MarketCapSelector: React.FC<Props> = ({ selectedRange, onRangeChange }) => {
  const ranges: { value: MarketCapRange; label: string }[] = [
    { value: '25', label: 'Top 25' },
    { value: '50', label: 'Top 50' },
    { value: '100', label: 'Top 100' }
  ];

  return (
    <select
      value={selectedRange}
      onChange={(e) => onRangeChange(e.target.value as MarketCapRange)}
      className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {ranges.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};