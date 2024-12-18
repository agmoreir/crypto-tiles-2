import * as d3 from 'd3';
import { CryptoData } from '../../types/crypto';

export const createBubbleSimulation = (
  data: CryptoData[],
  width: number,
  height: number,
  padding: number = 2
) => {
  // Create a new array with only the required properties to avoid cloning issues
  const simulationData = data.map(d => ({
    id: d.id,
    symbol: d.symbol,
    market_cap: d.market_cap,
    x: undefined,
    y: undefined
  }));

  return d3.forceSimulation(simulationData as any)
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('charge', d3.forceManyBody().strength(1))
    .force('collide', d3.forceCollide().radius(d => Math.sqrt(d.market_cap / 1e8) + padding + 15));
};