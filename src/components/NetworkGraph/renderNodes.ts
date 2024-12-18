import * as d3 from 'd3';
import { CryptoData, TimeRange } from '../../types/crypto';
import { getPriceChange } from '../../utils/priceUtils';

export const renderNodes = (svg: any, data: CryptoData[], timeRange: TimeRange) => {
  const nodes = svg.selectAll('g.node')
    .data(data)
    .join('g')
    .attr('class', 'node cursor-pointer')
    .call(setupDragBehavior(svg));

  nodes.append('circle')
    .attr('r', d => Math.sqrt(d.market_cap / 1e8) + 5)
    .attr('fill', d => getPriceChange(d, timeRange) > 0 ? '#4CAF50' : '#F44336')
    .attr('stroke', '#2d3748')
    .attr('stroke-width', 2);

  nodes.append('text')
    .text(d => d.symbol.toUpperCase())
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('fill', 'white')
    .attr('font-size', '12px');

  return nodes;
};

const setupDragBehavior = (svg: any) => {
  return d3.drag()
    .on('start', (event: any) => {
      if (!event.active) svg.simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    })
    .on('drag', (event: any) => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    })
    .on('end', (event: any) => {
      if (!event.active) svg.simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    });
};