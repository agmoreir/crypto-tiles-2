import { knownFolders, File } from '@nativescript/core';
import { CryptoData, Timeframe } from '../types/crypto.types';

export function getPriceChangeForTimeframe(data: CryptoData, timeframe: Timeframe): number {
    switch (timeframe) {
        case '7d':
            return data.price_change_percentage_7d || 0;
        case '30d':
            return data.price_change_percentage_30d || 0;
        default:
            return data.price_change_percentage_24h;
    }
}

export function generateNetworkHtml(data: CryptoData[], timeframe: Timeframe): string {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <script src="https://d3js.org/d3.v7.min.js"></script>
                <style>
                    body { margin: 0; background: #1a1a1a; }
                    svg { width: 100%; height: 100vh; }
                    .node text { font-size: 10px; fill: white; }
                    .tooltip {
                        position: absolute;
                        padding: 8px;
                        background: rgba(0, 0, 0, 0.8);
                        color: white;
                        border-radius: 4px;
                        font-size: 12px;
                        pointer-events: none;
                    }
                </style>
            </head>
            <body>
                <div id="tooltip" class="tooltip" style="display: none;"></div>
                <script>
                    const data = ${JSON.stringify(data)};
                    const timeframe = "${timeframe}";
                    
                    const width = window.innerWidth;
                    const height = window.innerHeight;
                    
                    const svg = d3.select('body')
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height);
                    
                    const tooltip = d3.select('#tooltip');
                    
                    // Create links between similar market cap coins
                    const links = data.flatMap((d1, i) => 
                        data.slice(i + 1).map((d2, j) => {
                            const marketCapDiff = Math.abs(Math.log(d1.market_cap) - Math.log(d2.market_cap));
                            return marketCapDiff < 0.5 ? { 
                                source: i, 
                                target: i + j + 1, 
                                strength: 1 - marketCapDiff 
                            } : null;
                        }).filter(Boolean)
                    );
                    
                    const simulation = d3.forceSimulation(data)
                        .force('link', d3.forceLink(links).strength(d => d.strength))
                        .force('charge', d3.forceManyBody().strength(-200))
                        .force('center', d3.forceCenter(width / 2, height / 2))
                        .force('collision', d3.forceCollide().radius(d => Math.sqrt(d.market_cap / 1e8) + 15));
                    
                    const g = svg.append('g');
                    
                    // Add links
                    g.selectAll('line')
                        .data(links)
                        .join('line')
                        .attr('stroke', '#333')
                        .attr('stroke-width', d => d.strength)
                        .attr('stroke-opacity', 0.3);
                    
                    // Add nodes
                    const nodes = g.selectAll('g.node')
                        .data(data)
                        .join('g')
                        .attr('class', 'node')
                        .on('touchstart', showTooltip)
                        .on('touchend', hideTooltip);
                    
                    nodes.append('circle')
                        .attr('r', d => Math.sqrt(d.market_cap / 1e8) + 5)
                        .attr('fill', d => {
                            const priceChange = timeframe === '24h' ? d.price_change_percentage_24h :
                                            timeframe === '7d' ? d.price_change_percentage_7d :
                                            d.price_change_percentage_30d;
                            return priceChange > 0 ? '#4CAF50' : '#F44336';
                        })
                        .attr('stroke', '#333')
                        .attr('stroke-width', 1);
                    
                    nodes.append('text')
                        .text(d => d.symbol.toUpperCase())
                        .attr('text-anchor', 'middle')
                        .attr('dy', '0.35em');
                    
                    function showTooltip(event, d) {
                        const priceChange = timeframe === '24h' ? d.price_change_percentage_24h :
                                        timeframe === '7d' ? d.price_change_percentage_7d :
                                        d.price_change_percentage_30d;
                        
                        tooltip.style('display', 'block')
                            .html(\`
                                <div>
                                    <strong>\${d.name}</strong> (\${d.symbol.toUpperCase()})<br>
                                    Price: $\${d.current_price.toLocaleString()}<br>
                                    Market Cap: $\${(d.market_cap / 1e9).toFixed(2)}B<br>
                                    \${timeframe} Change: \${priceChange.toFixed(2)}%
                                </div>
                            \`)
                            .style('left', (event.touches[0].clientX + 10) + 'px')
                            .style('top', (event.touches[0].clientY - 10) + 'px');
                    }
                    
                    function hideTooltip() {
                        tooltip.style('display', 'none');
                    }
                    
                    simulation.on('tick', () => {
                        g.selectAll('line')
                            .attr('x1', d => d.source.x)
                            .attr('y1', d => d.source.y)
                            .attr('x2', d => d.target.x)
                            .attr('y2', d => d.target.y);
                        
                        nodes.attr('transform', d => \`translate(\${d.x},\${d.y})\`);
                    });
                </script>
            </body>
        </html>
    `;
}

export async function createVisualizationFile(content: string): Promise<string> {
    const fileName = 'network-visualization.html';
    const folderPath = knownFolders.temp().path;
    const filePath = `${folderPath}/${fileName}`;
    
    const file = File.fromPath(filePath);
    await file.writeText(content);
    
    return `file://${filePath}`;
}