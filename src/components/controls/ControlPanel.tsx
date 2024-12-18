import React from 'react';
import { TimeRangeSelector } from './TimeRangeSelector';
import { MarketCapSelector } from './MarketCapSelector';
import { SortSelector } from './SortSelector';
import { CategorySelector } from './CategorySelector';
import { SearchBar } from './SearchBar';
import { ViewToggle } from './ViewToggle';
import { TimeRange, MarketCapRange, SortOption, CategoryFilter } from '../../types/crypto';

interface Props {
  timeRange: TimeRange;
  marketCapRange: MarketCapRange;
  sortOption: SortOption;
  category: CategoryFilter;
  searchTerm: string;
  showGraph: boolean;
  onTimeRangeChange: (range: TimeRange) => void;
  onMarketCapRangeChange: (range: MarketCapRange) => void;
  onSortOptionChange: (option: SortOption) => void;
  onCategoryChange: (category: CategoryFilter) => void;
  onSearchChange: (term: string) => void;
  onViewToggle: () => void;
}

export const ControlPanel: React.FC<Props> = ({
  timeRange,
  marketCapRange,
  sortOption,
  category,
  searchTerm,
  showGraph,
  onTimeRangeChange,
  onMarketCapRangeChange,
  onSortOptionChange,
  onCategoryChange,
  onSearchChange,
  onViewToggle,
}) => {
  return (
    <div className="bg-gray-800 p-4 shadow-lg rounded-lg mb-4">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <TimeRangeSelector selectedRange={timeRange} onRangeChange={onTimeRangeChange} />
          <MarketCapSelector selectedRange={marketCapRange} onRangeChange={onMarketCapRangeChange} />
          <SortSelector selectedOption={sortOption} onOptionChange={onSortOptionChange} />
          <CategorySelector selectedCategory={category} onCategoryChange={onCategoryChange} />
        </div>
        <div className="flex gap-4 items-center">
          <SearchBar value={searchTerm} onChange={onSearchChange} />
          <ViewToggle showGraph={showGraph} onToggle={onViewToggle} />
        </div>
      </div>
    </div>
  );
};