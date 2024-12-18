import * as d3 from 'd3';

export const createDragBehavior = (simulation: d3.Simulation<any, undefined>) => {
  return d3.drag()
    .on('start', (event: any) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    })
    .on('drag', (event: any) => {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    })
    .on('end', (event: any) => {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    });
};