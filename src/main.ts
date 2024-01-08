import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import * as Mapboxgl from 'mapbox-gl';
(Mapboxgl as any).accessToken = 'pk.eyJ1Ijoia2xlcml0aCIsImEiOiJja3hramV2OWIwbjEwMzFwYzJlZWl6N2g5In0.iKXPpYvo7UPRiiZ-x_lCrw';

if ( !navigator.geolocation ) {
    alert('Este navegador no soporta la geolocalización');
    throw new Error('Este navegador no soporta la geolocalización');
}  

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
