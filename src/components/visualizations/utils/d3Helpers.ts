import * as d3 from 'd3';
import { CryptoData } from '../../../types';

export const getColorScale = (value: number) => 
  d3.interpolateRdYlGn(value / 100);

export const calculateRadius = (marketCap: number) => 
  Math.sqrt(marketCap / 1e8) + 5;

export const setupSvg = (ref: SVGSVGElement, clearContent = true) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  const svg = d3.select(ref)
    .attr('width', width)
    .attr('height', height);
    
  if (clearContent) {
    svg.selectAll('*').remove();
  }
  
  return { svg, width, height };
};