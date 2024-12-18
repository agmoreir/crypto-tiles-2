import { Observable } from '@nativescript/core';
import { CryptoService } from '../services/CryptoService';

export class RadialViewModel extends Observable {
    private _isLoading = true;
    private _radialUrl = '';
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

    get radialUrl(): string {
        return this._radialUrl;
    }

    set radialUrl(value: string) {
        if (this._radialUrl !== value) {
            this._radialUrl = value;
            this.notifyPropertyChange('radialUrl', value);
        }
    }

    async loadData() {
        try {
            const data = await this.cryptoService.getTop100Coins();
            // Here we would process the data and create the radial visualization
            // For now, we'll use a placeholder
            this.radialUrl = 'about:blank';
        } catch (error) {
            console.error('Error loading radial data:', error);
        } finally {
            this.isLoading = false;
        }
    }
}