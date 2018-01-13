import { Injectable } from '@angular/core';
import { MapState } from '../models/map-state'; 

@Injectable()
export class MapStateService {

    private _mapState: MapState;

    constructor() { 
        this.initMapState();
    }

    public get(): MapState {
        return this._mapState;
    }

    public setMode(mode: string) {
        this._mapState.mode = mode;
        this.storeMapState();
    }    

    public setCenter(center: number[]) {
        this._mapState.center = center;
        this.storeMapState();
    }

    public setZoom(zoom: number) {
        this._mapState.zoom = zoom;
        this.storeMapState();
    }

    public setPitch(pitch: number) {
        this._mapState.pitch = pitch;
        this.storeMapState();
    }

    public setBearing(bearing: number) {
        this._mapState.bearing = bearing;    
        this.storeMapState();
    }    

    private storeMapState(): void {
        localStorage.setItem('mapState', JSON.stringify(this._mapState));
    }

    private initMapState(): void {
        if (localStorage.getItem('mapState')) {
            let storedMapState = JSON.parse(localStorage.getItem('mapState'));
            this._mapState = storedMapState;
        } else {
            this._mapState = new MapState();
            this._mapState.center = [13.286372494168859,62.116829297861074];
            this._mapState.zoom = 10;
            this._mapState.mode = "2D";
            this._mapState.pitch = 0;
            this._mapState.bearing = 0;            
        }

    }
    
}
