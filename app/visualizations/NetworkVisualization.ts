export function createNetworkVisualization(data: any[]) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const simulation = d3.forceSimulation(data)
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.market_cap / 1e8) + 5));

    const nodes = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', d => Math.sqrt(d.market_cap / 1e8) + 5)
        .attr('fill', d => d.price_change_percentage_24h > 0 ? '#4CAF50' : '#F44336')
        .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));

    simulation.on('tick', () => {
        nodes
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
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
}