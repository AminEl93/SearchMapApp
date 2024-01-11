import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from '.';

@Injectable({
    providedIn: 'root'
})

export class PlacesService {

    public userLocation?: [number, number];
    public isLoadingPlaces: boolean = false;
    public places: Feature[] = [];

    // Regresa si está lista la geolocalización del usuario
    get isUserLocationReady(): boolean {
        return !!this.userLocation;
    }

    constructor(private _placesApi: PlacesApiClient, private _mapService: MapService) {
        this.getUserLocation();
    }

    // Devuelve la geolocalización del usuario
    public async getUserLocation(): Promise<[number, number]> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    this.userLocation = [coords.longitude, coords.latitude];
                    resolve(this.userLocation);
                },
                (err) => {
                    alert('No se pudo obtener la geolocalización del usuario :(');
                    console.log(err);
                    reject();
                }
            );
        });
    }

    // Obtener los lugares buscados a partir de la petición HTTP al backend
    getPlacesByQuery(query: string = '') {
        if (query.length === 0) {
            this.isLoadingPlaces = false;
            this.places = [];
            return;
        }

        if (!this.userLocation) throw Error('No hay geolocalización');
        this.isLoadingPlaces = true;

        this._placesApi.get<PlacesResponse>(`/${query}.json`, {
            params: {
                proximity: this.userLocation.join(',')
            }
        }).subscribe(resp => {
            this.isLoadingPlaces = false;
            this.places = resp.features;
            this._mapService.createMarkersFromPlaces(this.places, this.userLocation!);  
        });
    }

    // Ocultar el menú de los lugares una vez se clica en una ruta concreta
    hidePlaces() {
        this.places = [];
    }
}
