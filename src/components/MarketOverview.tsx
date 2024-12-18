import React from 'react';
import { CryptoData } from '../types';
import { calculateTotalMarketCap, calculateTotalVolume, calculateBTCDominance } from '../utils/marketUtils';

interface Props {
  data: CryptoData[];
}

export const MarketOverview: React.FC<Props> = ({ data }) => {
  const totalMarketCap = calculateTotalMarketCap(data);
  const totalVolume = calculateTotalVolume(data);
  const btcDominance = calculateBTCDominance(data);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mb-4 transition-opacity duration-300 hover:opacity-0">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-gray-400">Total Market Cap</div>
          <div className="text-lg">${(totalMarketCap / 1e9).toFixed(2)}B</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">24h Volume</div>
          <div className="text-lg">${(totalVolume / 1e9).toFixed(2)}B</div>
        </div>
        <div>
          <div className="text-sm text-gray-400">BTC Dominance</div>
          <div className="text-lg">{btcDominance.toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
};