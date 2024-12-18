import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CryptoData, TimeRange } from '../types';
import { BubbleTooltip } from './BubbleTooltip';
import { filterData } from '../utils/filterUtils';
import { getPriceChange } from '../utils/priceUtils';

interface Props {
  data: CryptoData[];
  timeRange: TimeRange;
  marketCapRange: number;
  searchTerm: string;
}

export const BubbleView: React.FC<Props> = ({
  data,
  timeRange,
  marketCapRange,
  searchTerm,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    data: CryptoData;
    x: number;
    y: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const filteredData = filterData(data, marketCapRange, searchTerm);
    const width = window.innerWidth;
    const height = window.innerHeight - 100; // Reduced top margin

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const g = svg.append('g');

    // Create bubble simulation
    const simulation = d3.forceSimulation(filteredData)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(5))
      .force('collide', d3.forceCollide().radius(d => Math.sqrt(d.market_cap / 1e8) + 30));

    // Calculate market cap range for color gradient
    const maxMarketCap = d3.max(filteredData, d => d.market_cap) || 0;
    const minMarketCap = d3.min(filteredData, d => d.market_cap) || 0;
    const marketCapScale = d3.scaleLog()
      .domain([minMarketCap, maxMarketCap])
      .range([0.3, 1]); // For opacity

    // Create drag behavior
    const drag = d3.drag()
      .on('start', (event, d: any) => {
        setIsDragging(true);
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d: any) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d: any) => {
        setIsDragging(false);
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    // Create bubbles
    const bubbles = g.selectAll('g')
      .data(filteredData)
      .join('g')
      .attr('class', 'bubble cursor-pointer')
      .on('mouseover', (event, d) => {
        if (!isDragging) {
          setTooltipData({
            data: d,
            x: event.pageX,
            y: event.pageY
          });
        }
      })
      .on('mouseout', () => setTooltipData(null))
      .on('click', (event, d) => {
        if (!isDragging) {
          window.open(`https://www.coingecko.com/en/coins/${d.id}`, '_blank');
        }
      })
      .call(drag as any);

    // Add circles with gradient glow
    bubbles.append('circle')
      .attr('r', d => Math.sqrt(d.market_cap / 1e8) + 30)
      .attr('fill', '#000')
      .attr('stroke', d => {
        const priceChange = getPriceChange(d, timeRange);
        return priceChange > 0 ? '#4CAF50' : '#F44336';
      })
      .attr('stroke-width', 3)
      .style('filter', 'url(#glow)');

    // Add coin icons
    bubbles.append('image')
      .attr('xlink:href', d => d.image)
      .attr('x', d => -(Math.sqrt(d.market_cap / 1e8) + 30) / 3)
      .attr('y', d => -(Math.sqrt(d.market_cap / 1e8) + 30) / 3)
      .attr('width', d => (Math.sqrt(d.market_cap / 1e8) + 30) / 1.5)
      .attr('height', d => (Math.sqrt(d.market_cap / 1e8) + 30) / 1.5)
      .attr('opacity', 0.5);

    // Add coin symbols
    bubbles.append('text')
      .text(d => d.symbol.toUpperCase())
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', d => `${Math.max(12, Math.sqrt(Math.log(d.market_cap)) * 2)}px`)
      .attr('font-weight', 'bold');

    // Add percentage text
    bubbles.append('text')
      .text(d => `${getPriceChange(d, timeRange).toFixed(1)}%`)
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .attr('fill', 'white')
      .attr('font-size', '10px');

    // Add glow filter
    const defs = svg.append('defs');
    const filter = defs.append('filter')
      .attr('id', 'glow');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '3')
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    simulation.on('tick', () => {
      bubbles.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [data, timeRange, marketCapRange, searchTerm, isDragging]);

  return (
    <div className="relative">
      <svg 
        ref={svgRef} 
        className="w-full bg-gray-900 rounded-lg shadow-lg"
      />
      {tooltipData && !isDragging && (
        <BubbleTooltip
          data={tooltipData.data}
          timeRange={timeRange}
          x={tooltipData.x}
          y={tooltipData.y}
        />
      )}
    </div>
  );
};