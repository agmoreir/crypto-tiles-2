import { Observable } from '@nativescript/core';
import { CryptoService } from '../services/CryptoService';

export class HoneycombViewModel extends Observable {
    private _isLoading = true;
    private _honeycombUrl = '';
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

    get honeycombUrl(): string {
        return this._honeycombUrl;
    }

    set honeycombUrl(value: string) {
        if (this._honeycombUrl !== value) {
            this._honeycombUrl = value;
            this.notifyPropertyChange('honeycombUrl', value);
        }
    }

    async loadData() {
        try {
            const data = await this.cryptoService.getTop100Coins();
            // Here we would process the data and create the honeycomb visualization
            // For now, we'll use a placeholder
            this.honeycombUrl = 'about:blank';
        } catch (error) {
            console.error('Error loading honeycomb data:', error);
        } finally {
            this.isLoading = false;
        }
    }
}