import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { CryptoData } from '../../types';

interface Props {
  data: CryptoData[];
}

export const RadialChart: React.FC<Props> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width/2},${height/2})`);

    svg.selectAll('*').remove();

    const arc = d3.arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.8);

    const pie = d3.pie<CryptoData>()
      .value(d => d.market_cap)
      .sort(null);

    const arcs = svg.selectAll('g')
      .data(pie(data.slice(0, 20)))
      .join('g');

    arcs.append('path')
      .attr('d', arc as any)
      .attr('fill', d => d3.interpolateRdYlGn(d.data.price_change_percentage_24h / 100))
      .attr('stroke', '#fff')
      .attr('stroke-width', '1px');

    arcs.append('text')
      .attr('transform', d => `translate(${(arc as any).centroid(d)})`)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .text(d => d.data.symbol.toUpperCase())
      .style('font-size', '12px')
      .style('fill', '#fff');
  }, [data]);

  return <svg ref={svgRef} className="w-full h-full" />;
};