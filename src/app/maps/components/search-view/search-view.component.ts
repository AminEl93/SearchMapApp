import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map } from 'mapbox-gl';
import { PlacesService } from '../../services';

@Component({
    selector: 'app-search-view',
    templateUrl: './search-view.component.html',
    styleUrls: ['./search-view.component.css']
})

export class SearchViewComponent implements AfterViewInit {

    @ViewChild('mapDiv') mapDivElement!: ElementRef;
    
    constructor(private _placesService: PlacesService) { }
    
    ngAfterViewInit(): void {
        if (!this._placesService.userLocation) throw Error('No hay geolocalización');
        const map = new Map({
            container: this.mapDivElement.nativeElement,
            style: 'mapbox://styles/mapbox/streets-v12', // URL de estilos del mapa
            center: this._placesService.userLocation, // Ubicación actual del usuario
            zoom: 14 // Zoom inicial
        });
    }
}
