import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
    selector: 'app-search-view',
    templateUrl: './search-view.component.html',
    styleUrls: ['./search-view.component.css']
})

export class SearchViewComponent implements AfterViewInit {

    @ViewChild('mapDiv') mapDivElement!: ElementRef;
    
    constructor(private _placesService: PlacesService, private _mapService: MapService) { }
    
    ngAfterViewInit(): void {
        if (!this._placesService.userLocation) throw Error('No hay geolocalización');
        
        // Creación del mapa
        const map = new Map({
            container: this.mapDivElement.nativeElement,
            style: 'mapbox://styles/mapbox/streets-v12', // URL de estilos del mapa
            center: this._placesService.userLocation, // Ubicación actual del usuario
            zoom: 14 // Zoom inicial
        });

        const popup = new Popup().setHTML(
            `<h6 class="fw-bold">Hola, estoy aquí! &#128075</h6>
            <span>Estoy en este lugar del mundo &#128526</span>`
        );
    
        // Marcador con la ubicación actual del usuario
        new Marker({ color: 'blue' }).setLngLat(this._placesService.userLocation).setPopup(popup).addTo(map)
        
        // Inicializar el mapa y establecerlo en el servicio
        this._mapService.setMap(map); 
    }    
}
