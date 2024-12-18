import * as d3 from 'd3';
import { CryptoData } from '../../types/crypto';

export const createSimulation = (data: CryptoData[], links: any[], width: number, height: number) => {
  return d3.forceSimulation(data)
    .force('link', d3.forceLink(links).strength(d => d.strength))
    .force('charge', d3.forceManyBody().strength(-200))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.market_cap / 1e8) + 15));
};