import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { SearchViewComponent } from './components/search-view/search-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

@NgModule({
    declarations: [
        SearchPageComponent,
        SearchViewComponent,
        LoadingComponent,
        SearchBarComponent,
        SearchResultsComponent
    ],
    imports: [CommonModule],
    exports: [SearchPageComponent]
})

export class MapsModule { }
