import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { DirectionsResponse, Route } from '../interfaces/directions';

@Injectable({
    providedIn: 'root'
})

export class MapService {

    private map?: Map;
    private markers: Marker[] = [];

    get isMapReady() {
        return !!this.map;
    }

    constructor(private _directionsApi: DirectionsApiClient) { }

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
            const popup = new Popup({closeOnMove: true})
                .setHTML(
                    `<h6 class="fw-bold">${ place.text }</h6>
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
    
    // Obtener la ruta entre 2 puntos en el mapa. En este caso, entre la ubicación del usuario y otro punto
    getRouteBetweenPoints(start: [number, number], end: [number, number]) {
        this._directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
            .subscribe( resp => this.drawPolyline(resp.routes[0]) );    
    }

    // Dibujar la Polyline (ruta entre 2 puntos)
    private drawPolyline(route: Route) {
        console.log({ kms: route.distance / 1000, duration: route.duration / 60 });
        if (!this.map) throw Error('El mapa no está inicializado!');
    
        const coords = route.geometry.coordinates;    
        const bounds = new LngLatBounds();
        coords.forEach(([ lng, lat ]) => {
            bounds.extend([ lng, lat ]);
        });    
        this.map?.fitBounds(bounds, { padding: 200 });

        // Polyline
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [{
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: coords
                    }
                }]
            }
        }
    
        if (this.map.getLayer('RouteString')) {
            this.map.removeLayer('RouteString');
            this.map.removeSource('RouteString');
        }
    
        this.map.addSource('RouteString', sourceData);    
        this.map.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join':'round'
            },
            paint: {
                'line-color': 'black',
                'line-width': 3
            }
        });

        // Popup al pasar por encima de la polyline
        const popup = new Popup({ closeButton: false, closeOnClick: false })
            .setHTML(
                `<span class="d-block">
                    Distancia: <b>${ Math.round(route.distance / 1000) } kilómetros</b>
                 </span>
                 <span>
                    Duración: <b>${ Math.round(route.duration / 60) } minutos
                                (${ Math.round(route.duration / 60 / 60) } horas)</b>
                 </span>`
            );
   
        this.map.on('mouseover', 'RouteString', (event) => {
            this.map!.getCanvas().style.cursor = 'pointer';
            const coordinates = event.lngLat;
            popup.setLngLat(coordinates).addTo(this.map!);
        });
   
        this.map.on( 'mouseleave', 'RouteString', () => {
            this.map!.getCanvas().style.cursor = '';
            popup.remove();
        });
    }

    // Borrar la polyline una vez se borra el input de búsqueda
    clearPolyline() {
        if (!this.map) throw Error('Mapa no inicializado');     
        if (this.map.getLayer('RouteString')) {
            this.map.removeLayer('RouteString');
            this.map.removeSource('RouteString');
        }
    } 
}