import React from 'react';
import { CategoryFilter } from '../../types/crypto';

interface Props {
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}

export const CategorySelector: React.FC<Props> = ({ selectedCategory, onCategoryChange }) => {
  const categories: { value: CategoryFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'layer1', label: 'Layer 1' },
    { value: 'defi', label: 'DeFi' },
    { value: 'smart_contract', label: 'Smart Contract' },
    { value: 'portfolio', label: 'Portfolio' },
  ];

  return (
    <select
      value={selectedCategory}
      onChange={(e) => onCategoryChange(e.target.value as CategoryFilter)}
      className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {categories.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};