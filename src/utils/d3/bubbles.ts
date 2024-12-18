import * as d3 from 'd3';
import { CryptoData, TimeRange } from '../../types/crypto';
import { getPriceChange } from '../priceUtils';

export const renderBubbles = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  data: CryptoData[],
  timeRange: TimeRange,
  onMouseOver: (event: any, d: CryptoData) => void,
  onMouseOut: () => void,
  dragBehavior: d3.DragBehavior<Element, unknown, unknown>
) => {
  const bubbles = svg.selectAll('g')
    .data(data)
    .join('g')
    .attr('class', 'bubble cursor-pointer')
    .on('mouseover', onMouseOver)
    .on('mouseout', onMouseOut)
    .call(dragBehavior as any);

  // Add circles
  bubbles.append('circle')
    .attr('r', d => Math.sqrt(d.market_cap / 1e8) + 15)
    .attr('fill', d => {
      const change = getPriceChange(d, timeRange);
      return change > 0 ? '#4CAF50' : '#F44336';
    })
    .attr('stroke', '#2d3748')
    .attr('stroke-width', 2)
    .attr('opacity', 0.8);

  // Add symbol text
  bubbles.append('text')
    .text(d => d.symbol.toUpperCase())
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('fill', 'white')
    .attr('font-size', '12px')
    .attr('font-weight', 'bold');

  // Add percentage text
  bubbles.append('text')
    .text(d => `${getPriceChange(d, timeRange).toFixed(1)}%`)
    .attr('text-anchor', 'middle')
    .attr('dy', '1.5em')
    .attr('fill', 'white')
    .attr('font-size', '10px');

  return bubbles;
};