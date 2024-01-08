import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
    providedIn: 'root'
})

export class MapService {

    private map?: Map;

    get isMapReady() {
        return !!this.map;
    }

    // Establecer el mapa de manera global
    setMap(map: Map) {
        this.map = map;
    }

    // Mover el mapa a cualquier punto de la pantalla
    flyTo(coords: LngLatLike) {
        if (!this.isMapReady) throw Error('El mapa no está inicializado!');    
        this.map?.flyTo({
            zoom: 15,
            center: coords
        });    
    }
}