export function createHoneycombVisualization(data: any[]) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const hexRadius = 30;

    const svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const hexbin = d3.hexbin()
        .radius(hexRadius)
        .extent([[0, 0], [width, height]]);

    // Transform data for hexbin layout
    const points = data.map((d, i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        return [col * hexRadius * 2, row * hexRadius * Math.sqrt(3)];
    });

    svg.append('g')
        .selectAll('path')
        .data(hexbin(points))
        .enter()
        .append('path')
        .attr('d', hexbin.hexagon())
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .attr('fill', (d, i) => d3.interpolateRdYlGn(data[i]?.price_change_percentage_24h / 100))
        .attr('stroke', '#fff')
        .attr('stroke-width', '1px');
}