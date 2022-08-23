// event listener for zooming
map.on("zoomend", function () {
  /* Change layers based on current zoom level */

  // current zoom level
  var zoom = map.getZoom();

  if (zoom > 11) {
      // far away use dark map
      map.setStyle("mapbox://styles/mapbox/satellite-streets-v11");
  } else {
      // close use satellite view
      map.setStyle("mapbox://styles/mapbox/dark-v10");
  }
});