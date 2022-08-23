mapboxgl.accessToken = "pk.eyJ1IjoibW9yZ2Vua2FmZmVlIiwiYSI6IjIzcmN0NlkifQ.0LRTNgCc-envt9d5MzR75w";
      var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/dark-v10",
        center: [-120.393, 36.937],
        zoom: 5,
        maxZoom: 15,
        minZoom: 5,
      });

      // event listener for zoom
      map.on("zoomend", function () {
        var zoom = map.getZoom();
        if (zoom > 11) {
          map.setStyle("mapbox://styles/mapbox/satellite-streets-v11");
        } else {
          map.setStyle("mapbox://styles/mapbox/dark-v10");
        }
      });

/*
// click functionality
map.on('style.load', function() {
map.on('click', function(e) {
var coordinates = e.lngLat;
new mapboxgl.Popup().setLngLat(coordinates).setHTML(coordinates.lng + ',  < br / > ' + coordinates.lat).addTo(map);
// add api call
//const Url = 'https://openet-raster-api.org/experimental/forecast/warping?end_date=2022-08-10&interval=monthly&lon=-120.34557095073147&lat=37.543664330429905&model=ensemble&variable=et&ref_et_source=gridmet&units=metric&moving_average=0&output_file_format=json&admin_key=hello'
});
});
*/
      const draw = new MapboxDraw({
        displayControlsDefault: false,
        // Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
          polygon: true,
          trash: true,
        },
      });

      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(draw);
      map.on("draw.create", updateArea);
      map.on("draw.delete", updateArea);
      map.on("draw.update", updateArea);

      function updateArea(e) {
        const data = draw.getAll();
        const answer = document.getElementById("calculated-area");
        if (data.features.length > 0) {
          // m2 to acres
          const area = turf.area(data) * 0.000247105;

          // restrict the area to 2 decimal points.
          const rounded_area = Math.round(area * 100) / 100;

          var coordinates = e.features[0].geometry.coordinates[0][0];
          new mapboxgl.Popup({ closeOnClick: false, closeOnMove: true })
            .setLngLat(coordinates)
            .setHTML(rounded_area + " acres")
            .addTo(map);
        }
      }