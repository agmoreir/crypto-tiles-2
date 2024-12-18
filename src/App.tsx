import React, { useState } from 'react';
import { CryptoData, TimeRange } from './types';
import { TileGrid } from './components/CryptoTiles/TileGrid';
import { Controls } from './components/Controls';
import { MarketOverview } from './components/MarketOverview';
import { useCryptoData } from './hooks/useCryptoData';
import { filterCryptoData } from './utils/filterUtils';

const App: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');
  const [marketCapRange, setMarketCapRange] = useState<number>(100);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, loading, error } = useCryptoData();

  const handleReset = () => {
    setTimeRange('24h');
    setMarketCapRange(100);
    setSearchTerm('');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen error={error} />;
  }

  const filteredData = filterCryptoData(data, marketCapRange, searchTerm);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <MarketOverview data={data} />
      <Controls
        timeRange={timeRange}
        marketCapRange={marketCapRange}
        searchTerm={searchTerm}
        onTimeRangeChange={setTimeRange}
        onMarketCapRangeChange={setMarketCapRange}
        onSearchChange={setSearchTerm}
        onReset={handleReset}
        data={filteredData}
      />
      <TileGrid 
        data={filteredData}
        timeRange={timeRange}
      />
    </div>
  );
};

const LoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
    Loading...
  </div>
);

const ErrorScreen: React.FC<{ error: string }> = ({ error }) => (
  <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
    Error: {error}
  </div>
);

export default App;