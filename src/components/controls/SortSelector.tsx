import React from 'react';
import { SortOption } from '../../types/crypto';

interface Props {
  selectedOption: SortOption;
  onOptionChange: (option: SortOption) => void;
}

export const SortSelector: React.FC<Props> = ({ selectedOption, onOptionChange }) => {
  const options: { value: SortOption; label: string }[] = [
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'price_change', label: 'Price Change' },
    { value: 'volume', label: 'Volume' },
  ];

  return (
    <select
      value={selectedOption}
      onChange={(e) => onOptionChange(e.target.value as SortOption)}
      className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          Sort by {label}
        </option>
      ))}
    </select>
  );
};