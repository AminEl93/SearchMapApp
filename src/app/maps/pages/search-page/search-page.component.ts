import { Component } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html'
})

export class SearchPageComponent {
    
    constructor(private _placesService: PlacesService) { }

    get isUserLocationReady() {
        return this._placesService.isUserLocationReady;
    }
}
