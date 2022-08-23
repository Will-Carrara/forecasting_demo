map.on('load', () => {
  map.addSource('fields', {
    type: 'geojson',
    data: 'data/fields.geojson'
  });
   
  // Add a new layer to visualize the polygon.
  map.addLayer({
    'id': 'fields',
    'type': 'fill',
    'source': 'fields', // reference the data source
    'layout': {},
    'paint': {
      'fill-color': '#0080ff', // blue color fill
      'fill-opacity': 0.5
    }
  });

  // Add a black outline around the polygons
  map.addLayer({
    'id': 'outline',
    'type': 'line',
    'source': 'fields',
    'layout': {},
    'paint': {
      'line-color': '#000',
      'line-width': 3
    }
  });
});