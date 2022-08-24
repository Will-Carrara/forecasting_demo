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

// call api
map.on("draw.create", callApi);
map.on("draw.update", callApi);

function updateArea(e) {
  /* Calculate the area of a drawn polygon in acres*/
  const data = draw.getAll();

  // check if polygon exists
  if (data.features.length > 0) {
    // convert m2 to acres
    const area = turf.area(data) * 0.000247105;

    // restrict the area to 2 decimal points
    const rounded_area = Math.round(area * 100) / 100;

    // add popup to display area
    var coordinates = e.features[0].geometry.coordinates[0][0];
    new mapboxgl.Popup({ closeOnClick: false, closeOnMove: true })
      .setLngLat(coordinates)
      .setHTML(rounded_area + " acres")
      .addTo(map);
  }
}

function callApi(e) {
  /* Trigger modal popup and call api*/

  // center of polygon 
  const coordinates = turf.center(e.features[0]).geometry.coordinates
  console.log(coordinates)

  $.ajax({
    type: "POST",
    url: "api.py",
    data: { param: coordinates}
  }).done(function( o ) {
    console.log(o)
  });

  //const url = "https://openet-raster-api.org/experimental/forecast/warping?end_date=2022-08-10&interval=monthly&lon=-120.34557095073147&lat=37.543664330429905&model=ensemble&variable=et&ref_et_source=gridmet&units=metric&moving_average=0&output_file_format=json&admin_key=hello"
  
  var modal = document.getElementById("myModal");
  modal.style.display = "block";

  // when the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}

