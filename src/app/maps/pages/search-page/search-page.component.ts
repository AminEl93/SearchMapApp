import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.css']
})

export class SearchPageComponent {
    
    constructor(private _placesService: PlacesService, private _mapService: MapService) { }

    get isUserLocationReady() {
        return this._placesService.isUserLocationReady;
    }

    // Ir a la ubicación actual del usuario
    goToMyLocation() {
        if (!this._placesService.isUserLocationReady) throw Error('No hay ubicación del usuario');
        if (!this._mapService.isMapReady) throw Error('El mapa no está disponible');
        this._mapService.flyTo(this._placesService.userLocation!);    
    }
}