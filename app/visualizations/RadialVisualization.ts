export function createRadialVisualization(data: any[]) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width/2},${height/2})`);

    const arc = d3.arc()
        .innerRadius(radius * 0.4)
        .outerRadius(radius * 0.8);

    const pie = d3.pie()
        .value(d => d.market_cap)
        .sort(null);

    const arcs = svg.selectAll('path')
        .data(pie(data.slice(0, 20)))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => d3.interpolateRdYlGn(d.data.price_change_percentage_24h / 100))
        .attr('stroke', '#fff')
        .attr('stroke-width', '1px');

    // Add labels
    const labels = svg.selectAll('text')
        .data(pie(data.slice(0, 20)))
        .enter()
        .append('text')
        .attr('transform', d => `translate(${arc.centroid(d)})`)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'middle')
        .text(d => d.data.symbol.toUpperCase())
        .style('font-size', '12px')
        .style('fill', '#fff');
}