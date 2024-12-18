import { Observable } from '@nativescript/core';
import { CryptoService } from '../services/CryptoService';

export class NetworkViewModel extends Observable {
    private _isLoading = true;
    private _networkUrl = '';
    private cryptoService = CryptoService.getInstance();

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

    async loadData() {
        try {
            const data = await this.cryptoService.getTop100Coins();
            // Here we would process the data and create the network visualization
            // For now, we'll use a placeholder
            this.networkUrl = 'about:blank';
        } catch (error) {
            console.error('Error loading network data:', error);
        } finally {
            this.isLoading = false;
        }
    }
}