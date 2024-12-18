import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { CryptoData, TimeRange } from '../../types';
import { CryptoTooltip } from '../common/CryptoTooltip';

interface Props {
  data: CryptoData[];
  timeRange: TimeRange;
}

export const NetworkGraph: React.FC<Props> = ({ data, timeRange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltipData, setTooltipData] = useState<{ data: CryptoData; x: number; y: number } | null>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const width = window.innerWidth;
    const height = window.innerHeight - 100;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    // Create links between coins with similar market caps
    const links = data.flatMap((d1, i) => 
      data.slice(i + 1).map((d2, j) => {
        const marketCapDiff = Math.abs(Math.log(d1.market_cap) - Math.log(d2.market_cap));
        return marketCapDiff < 0.5 ? { source: i, target: i + j + 1, strength: 1 - marketCapDiff } : null;
      }).filter(Boolean)
    );

    const simulation = d3.forceSimulation(data)
      .force('link', d3.forceLink(links).strength(d => d.strength))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.market_cap / 1e8) + 15));

    const g = svg.append('g');

    // Add links
    g.selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#2d3748')
      .attr('stroke-width', d => d.strength)
      .attr('stroke-opacity', 0.3);

    // Add nodes
    const nodes = g.selectAll('g.node')
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
      .attr('fill', d => {
        const priceChange = timeRange === '24h' ? d.price_change_percentage_24h :
                          timeRange === '7d' ? d.price_change_percentage_7d :
                          timeRange === '30d' ? d.price_change_percentage_30d :
                          d.price_change_percentage_1y;
        return d3.interpolateRdYlGn((priceChange || 0) / 100);
      })
      .attr('stroke', '#2d3748')
      .attr('stroke-width', 2);

    nodes.append('text')
      .text(d => d.symbol.toUpperCase())
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', '12px');

    simulation.on('tick', () => {
      g.selectAll('line')
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      nodes.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, [data, timeRange]);

  return (
    <div className="relative">
      <svg ref={svgRef} className="w-full h-full bg-gray-900" />
      {tooltipData && (
        <div
          className="absolute z-10 pointer-events-none"
          style={{
            left: tooltipData.x + 10,
            top: tooltipData.y - 10,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <CryptoTooltip data={tooltipData.data} timeRange={timeRange} />
        </div>
      )}
    </div>
  );
};