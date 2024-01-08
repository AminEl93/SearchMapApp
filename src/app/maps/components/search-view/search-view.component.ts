import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
    selector: 'app-search-view',
    templateUrl: './search-view.component.html',
    styleUrls: ['./search-view.component.css']
})

export class SearchViewComponent implements OnInit{

    constructor( private _placesService: PlacesService) { }
    
    ngOnInit(): void {
        console.log(this._placesService.useLocation);
    }
}
