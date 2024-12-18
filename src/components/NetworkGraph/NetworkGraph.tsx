import React, { useEffect, useRef, useState } from 'react';
import { CryptoData, TimeRange } from '../../types/crypto';
import { NetworkTooltip } from './NetworkTooltip';
import * as d3 from 'd3';

interface Props {
  data: CryptoData[];
  timeRange: TimeRange;
}

export const NetworkGraph: React.FC<Props> = ({ data, timeRange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltipData, setTooltipData] = useState<{
    data: CryptoData;
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const width = window.innerWidth;
    const height = window.innerHeight - 120;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g');

    // Create links between coins with similar market caps
    const links = data.flatMap((d1, i) => 
      data.slice(i + 1).map((d2, j) => {
        const marketCapDiff = Math.abs(Math.log(d1.market_cap) - Math.log(d2.market_cap));
        return marketCapDiff < 0.5 ? { 
          source: i, 
          target: i + j + 1, 
          strength: 1 - marketCapDiff 
        } : null;
      }).filter(Boolean)
    );

    const simulation = d3.forceSimulation(data)
      .force('link', d3.forceLink(links).strength(d => d.strength))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.market_cap / 1e8) + 15));

    // Add links
    svg.selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#2d3748')
      .attr('stroke-width', d => d.strength)
      .attr('stroke-opacity', 0.3);

    // Add nodes
    const nodes = svg.selectAll('g.node')
      .data(data)
      .join('g')
      .attr('class', 'node cursor-pointer')
      .on('mouseover', (event, d) => {
        setTooltipData({
          data: d,
          x: event.pageX,
          y: event.pageY
        });
      })
      .on('mouseout', () => setTooltipData(null))
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

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

    simulation.on('tick', () => {
      svg.selectAll('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodes.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, timeRange]);

  return (
    <div className="relative">
      <svg 
        ref={svgRef} 
        className="w-full h-[calc(100vh-120px)] bg-gray-900"
      />
      {tooltipData && (
        <NetworkTooltip
          data={tooltipData.data}
          timeRange={timeRange}
          x={tooltipData.x}
          y={tooltipData.y}
        />
      )}
    </div>
  );
};

const getPriceChange = (data: CryptoData, timeRange: TimeRange): number => {
  switch (timeRange) {
    case '7d':
      return data.price_change_percentage_7d || 0;
    case '30d':
      return data.price_change_percentage_30d || 0;
    default:
      return data.price_change_percentage_24h;
  }
};