import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
    providedIn: 'root'
})

export class MapService {

    private map?: Map;
    private markers: Marker[] = [];

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

    // Crear un marcador para cada lugar encontrado
    createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {
        if (!this.map) throw Error('El mapa no está inicializado');    
        this.markers.forEach(marker => marker.remove());
        const newMarkers = [];
    
        for (const place of places) {
            const [lng, lat] = place.center;
            const popup = new Popup()
                .setHTML(
                    `<h6>${ place.text }</h6>
                    <span>${ place.place_name }</span>`
                );    
            const newMarker = new Marker().setLngLat([lng, lat]).setPopup(popup).addTo(this.map);    
            newMarkers.push(newMarker);
        }
    
        this.markers = newMarkers;    
        if (places.length === 0) return;
    
        // Límites del mapa para que se ajuste a la pantalla
        const bounds = new LngLatBounds();
        newMarkers.forEach( marker => bounds.extend(marker.getLngLat()) );
        bounds.extend(userLocation);    
        this.map.fitBounds(bounds, { padding: 200 });    
    }    
}