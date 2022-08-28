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
  };
};

function callApi(e) {
  /* Trigger modal popup and call api*/

  // center of polygon 
  const coordinates = turf.center(e.features[0]).geometry.coordinates;
  const lon = coordinates[0];
  const lat = coordinates[1];

  // variable of interest 
  const variable = 'et'

  // request url 
  const url = `https://openet-raster-api.org/experimental/forecast/warping?end_date=2022-01-02&interval=monthly&lon=${lon}&lat=${lat}&model=ensemble&variable=${variable}&ref_et_source=gridmet&units=metric&moving_average=0&output_file_format=json&admin_key=hello`;

  // make api request
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error in Network Response');
      }
      return response.json();
    })
    .then((result) => {
      // populate series
      var timeseries = new Array();
      for (i = 0; i < result.length; i++) {
        timeseries.push(result[i].et);
      }
    
    // range calculation
    var range = new Array();
    for (i = 0; i < timeseries.length; i++) {
      if (i < 8) {
        range.push([null, null]);
      } else if (i == 8) {
        range.push([parseInt(timeseries[i]*1), parseInt(timeseries[i]*1)]);
      }else {
        range.push([parseInt(timeseries[i]*.7), parseInt(timeseries[i]*1.3)]);
      }
    }

    // plot the data
    var chart = plotData(timeseries, range, 'ET')
    // when the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        chart.destroy();
      };
    };
  });
  
  // display the modal popup with the graph
  var modal = document.getElementById("graphModal");
  modal.style.display = "block";
  update_bar();
};

