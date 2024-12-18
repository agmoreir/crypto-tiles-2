import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as d3Hexbin from 'd3-hexbin';
import { CryptoData } from '../../types';

interface Props {
  data: CryptoData[];
}

export const HoneycombMap: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const hexRadius = 40;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const hexbin = d3Hexbin.hexbin()
      .radius(hexRadius)
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]]);

    const points = data.map((d, i) => {
      const col = i % 10;
      const row = Math.floor(i / 10);
      return [
        margin.left + col * hexRadius * 2 + (row % 2) * hexRadius,
        margin.top + row * hexRadius * Math.sqrt(3)
      ];
    });

    const g = svg.append('g');

    // Add hexagons
    g.selectAll('path')
      .data(hexbin(points))
      .join('path')
      .attr('d', hexbin.hexagon())
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('fill', (_, i) => d3.interpolateRdYlGn((data[i]?.price_change_percentage_24h || 0) / 100))
      .attr('stroke', '#2d3748')
      .attr('stroke-width', '2px')
      .on('mouseover', (event, d) => {
        const i = points.findIndex(p => Math.abs(p[0] - d.x) < 1 && Math.abs(p[1] - d.y) < 1);
        if (i >= 0) {
          const coin = data[i];
          const tooltip = svg.append('g')
            .attr('class', 'tooltip')
            .attr('transform', `translate(${d.x},${d.y - hexRadius - 10})`);

          tooltip.append('rect')
            .attr('x', -100)
            .attr('y', -50)
            .attr('width', 200)
            .attr('height', 60)
            .attr('fill', '#1a202c')
            .attr('rx', 5);

          tooltip.append('text')
            .attr('x', 0)
            .attr('y', -25)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text(`${coin.name} (${coin.symbol.toUpperCase()})`);

          tooltip.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .text(`$${coin.current_price.toLocaleString()}`);
        }
      })
      .on('mouseout', () => {
        svg.selectAll('.tooltip').remove();
      });

    // Add symbols
    g.selectAll('text')
      .data(hexbin(points))
      .join('text')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .text((_, i) => data[i]?.symbol.toUpperCase() || '');

  }, [data]);

  return <svg ref={svgRef} className="w-full h-full bg-gray-900" />;
};