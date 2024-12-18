import * as d3 from 'd3';

export const setupGraph = (element: SVGSVGElement) => {
  const width = window.innerWidth;
  const height = window.innerHeight - 120;

  const svg = d3.select(element)
    .attr('width', width)
    .attr('height', height)
    .append('g');

  return { svg, width, height };
};