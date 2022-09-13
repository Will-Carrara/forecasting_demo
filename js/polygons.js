// add custom geojson
map.on('load', () => {
  map.addSource('fields', {
      type: 'geojson',
      data: 'https://raw.githubusercontent.com/Will-Carrara/forecasting_demo/main/data/fields.geojson'
  });

  // add a new layer to visualize the polygons
  map.addLayer({
      'id': 'sample_fields',
      'type': 'fill',
      'source': 'fields',
      'layout': {},
      'paint': {
          'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'et'],
              0, '#9f6212',
              240, '#dddd45',
              540, '#70bd59',
              840, '#4dc1a2',
              1200, '#2b3f65'
          ],
          'fill-opacity': 0.75
      }
  });

  // add a black outline around the polygons
  map.addLayer({
      'id': 'outline',
      'type': 'line',
      'source': 'fields',
      'layout': {},
      'paint': {
          'line-color': '#000',
          'line-width': 3
      }
  }, 'country-label');

  // create a popup, but don't add it to the map yet
  const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
  });

  // display popup on hover
  map.on('mouseenter', 'sample_fields', (e) => {
      // change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = 'pointer';

      // copy coordinates array
      const coordinates = turf.center(e.features[0]).geometry.coordinates
      const id = e.features[0].properties.id;

      // ensure that if the map is zoomed out such that multiple copies of the feature are visible
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // populate the popup and set its coordinates
      popup.setLngLat(coordinates).setHTML("Field ID: " + id).addTo(map);
  });

  // dismiss popup if mouse leaves polygon
  map.on('mouseleave', 'sample_fields', () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
  });
});