import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class PlacesService {

    public userLocation?: [number, number];

    // Regresa si está lista la geolocalización del usuario
    get isUserLocationReady(): boolean {
        return !!this.userLocation;
    }

    constructor() {
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
}
