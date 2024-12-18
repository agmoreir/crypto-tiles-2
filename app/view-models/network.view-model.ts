import { Observable } from '@nativescript/core';
import { ApiService } from '../services/api.service';
import { CryptoData, Timeframe } from '../types/crypto.types';
import { generateNetworkHtml, createVisualizationFile } from '../utils/visualization.utils';

export class NetworkViewModel extends Observable {
    private _isLoading = true;
    private _networkUrl = '';
    private _timeframe: Timeframe = '24h';
    private apiService = ApiService.getInstance();
    private cryptoData: CryptoData[] = [];

    constructor() {
        super();
        this.loadData();
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    set isLoading(value: boolean) {
        if (this._isLoading !== value) {
            this._isLoading = value;
            this.notifyPropertyChange('isLoading', value);
        }
    }

    get networkUrl(): string {
        return this._networkUrl;
    }

    set networkUrl(value: string) {
        if (this._networkUrl !== value) {
            this._networkUrl = value;
            this.notifyPropertyChange('networkUrl', value);
        }
    }

    get timeframe(): Timeframe {
        return this._timeframe;
    }

    set timeframe(value: Timeframe) {
        if (this._timeframe !== value) {
            this._timeframe = value;
            this.notifyPropertyChange('timeframe', value);
            this.updateVisualization();
        }
    }

    async loadData() {
        try {
            this.isLoading = true;
            this.cryptoData = await this.apiService.getTop100Coins();
            await this.updateVisualization();
        } catch (error) {
            console.error('Error loading network data:', error);
        } finally {
            this.isLoading = false;
        }
    }

    private async updateVisualization() {
        const html = generateNetworkHtml(this.cryptoData, this.timeframe);
        this.networkUrl = await createVisualizationFile(html);
    }

    onTimeframeChange(args: any) {
        const button = args.object;
        this.timeframe = button.get('data-timeframe') as Timeframe;
    }
}