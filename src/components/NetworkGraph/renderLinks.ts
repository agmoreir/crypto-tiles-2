import * as d3 from 'd3';

export const renderLinks = (svg: any, links: any[]) => {
  return svg.selectAll('line')
    .data(links)
    .join('line')
    .attr('stroke', '#2d3748')
    .attr('stroke-width', d => d.strength)
    .attr('stroke-opacity', 0.3);
};