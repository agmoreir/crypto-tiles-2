import React from 'react';
import { CryptoTile } from './CryptoTile';
import { TileTooltip } from './TileTooltip';
import { CryptoData, TimeRange } from '../../types/crypto';
import { Legend } from '../Legend';

interface Props {
  data: CryptoData[];
  timeRange: TimeRange;
}

export const TileGrid: React.FC<Props> = ({ data, timeRange }) => {
  const [hoveredTile, setHoveredTile] = React.useState<{
    data: CryptoData;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Crypto Tiles</h1>
      <Legend />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
        {data.map((crypto) => (
          <CryptoTile
            key={crypto.id}
            data={crypto}
            timeRange={timeRange}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredTile({
                data: crypto,
                x: rect.left + (rect.width / 2), // Center of the tile
                y: rect.top, // Top of the tile
              });
            }}
            onMouseLeave={() => setHoveredTile(null)}
            onClick={() => window.open(`https://www.coingecko.com/en/coins/${crypto.id}`, '_blank')}
          />
        ))}
      </div>
      {hoveredTile && (
        <TileTooltip
          data={hoveredTile.data}
          timeRange={timeRange}
          x={hoveredTile.x}
          y={hoveredTile.y}
        />
      )}
    </div>
  );
};