import { knownFolders, File } from '@nativescript/core';
import * as d3 from 'd3';

export class VisualizationService {
    private static instance: VisualizationService;

    private constructor() {}

    public static getInstance(): VisualizationService {
        if (!VisualizationService.instance) {
            VisualizationService.instance = new VisualizationService();
        }
        return VisualizationService.instance;
    }

    private generateHtml(svgContent: string): string {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        body { margin: 0; }
                        svg { width: 100%; height: 100vh; }
                    </style>
                    <script src="https://d3js.org/d3.v7.min.js"></script>
                </head>
                <body>
                    ${svgContent}
                    <script>
                        // D3.js visualization code will be injected here
                    </script>
                </body>
            </html>
        `;
    }

    public async createVisualization(data: any[], type: 'honeycomb' | 'network' | 'radial'): Promise<string> {
        const htmlContent = this.generateHtml('');
        const fileName = `${type}-visualization.html`;
        const folderPath = knownFolders.temp().path;
        const filePath = `${folderPath}/${fileName}`;
        
        const file = File.fromPath(filePath);
        await file.writeText(htmlContent);
        
        return `file://${filePath}`;
    }
}