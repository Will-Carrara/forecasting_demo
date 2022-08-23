// add draw object
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
      polygon: true,
      trash: true,
  },
});

// add control tools
map.addControl(draw);

// update area 
map.on("draw.create", updateArea);
map.on("draw.delete", updateArea);
map.on("draw.update", updateArea);

function updateArea(e) {
  /* Calculate the area of a drawn polygon in acres*/
  const data = draw.getAll();

  // check if polygon is drawn
  if (data.features.length > 0) {
    // m2 to acres
    const area = turf.area(data) * 0.000247105;

    // restrict the area to 2 decimal points.
    const rounded_area = Math.round(area * 100) / 100;

    // add popup to display area
    var coordinates = e.features[0].geometry.coordinates[0][0];
    new mapboxgl.Popup({ closeOnClick: false, closeOnMove: true })
      .setLngLat(coordinates)
      .setHTML(rounded_area + " acres")
      .addTo(map);
  }
}