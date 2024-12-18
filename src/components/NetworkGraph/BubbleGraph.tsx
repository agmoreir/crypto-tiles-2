useEffect(() => {
  if (!svgRef.current || !data.length) return;

  const { width, height } = getGraphDimensions();

  // Create the SVG element
  const svg = d3
    .select(svgRef.current)
    .attr('width', width)
    .attr('height', height);

  svg.selectAll('*').remove();

  // Initialize zoom
  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 5]) // Allow zooming out to 10% and in to 500%
    .on('zoom', (event) => {
      g.attr('transform', event.transform);
    });

  svg.call(zoom as any);

  // Apply an initial zoom transform (start zoomed out)
  const initialZoom = d3.zoomIdentity.scale(0.3); // Start at 30% zoom
  svg.call(zoom.transform, initialZoom);

  // Append group element
  const g = svg.append('g');

  // Initialize the simulation
  const simulation = createBubbleSimulation(data, width, height);
  const dragBehavior = createDragBehavior(simulation);

  // Render the bubbles
  const bubbles = renderBubbles(
    g,
    data,
    timeRange,
    handleMouseOver,
    handleMouseOut,
    dragBehavior
  );

  // Update bubbles on simulation tick
  simulation.on('tick', () => {
    bubbles.attr('transform', (d) => `translate(${d.x},${d.y})`);
  });

  // Bubble click behavior
  bubbles.on('click', (event, d) => {
    window.open(`https://www.coingecko.com/en/coins/${d.id}`, '_blank');
  });

  return () => {
    simulation.stop();
  };
}, [data, timeRange, handleMouseOver, handleMouseOut]);
