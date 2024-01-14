# SearchMapApp
Esta aplicación consiste en un mapa creado con [Mapbox](https://www.mapbox.com) con el que se puede buscar cualquier ubicación del mundo, además de un botón que apunta a la ubicación real y actual del usuario. Hay un buscador en el que, simplemente al dejar de escribir, se despliega un menú con las ubicaciones sugeridas y en el mapa salen todos los marcadores relacionados con ellas. Si se clica en alguna ubicación del menú, te lleva directamente a ella junto con su marcador.

También si se clica en el botón "**Ruta**" de cada una de las ubicaciones, se dibuja la **[polyline](https://developers.google.com/maps/documentation/javascript/shapes?hl=es-419)** (ruta entre 2 puntos) entre la ubicación real del usuario y la seleccionada. La aplicación se ha generado con la versión 16.0.0 de Angular CLI, con la versión 18.16.0 de NodeJS y con la versión 9.6.6 de npm.

Para probar la aplicación, se puede acceder a este [enlace](https://search-map-amin.netlify.app).