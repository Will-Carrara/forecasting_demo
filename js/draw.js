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

// call api
map.on("draw.create", callApi);
map.on("draw.delete", null);
map.on("draw.update", callApi);

function callApi(e) {
  /* Trigger modal popup and call api*/

  // polygon
  const polygon = e.features[0]

  // calculate geometric center
  const coordinates = turf.center(polygon).geometry.coordinates;
  let lon = coordinates[0];
  let lat = coordinates[1];

  // convert m2 to acres
  let area = (turf.area(polygon) * 0.000247105).toFixed(2);

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
      } else {
        range.push([parseInt(timeseries[i]*.7), parseInt(timeseries[i]*1.3)]);
      };
    };

    // plot the data
    var chart = plotData(timeseries, range, area, 'ET')
    // when the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        chart.destroy();
      };
    };
  });
  
  // display the modal popup with the graph and loader
  var modal = document.getElementById("graphModal");
  modal.style.display = "block";
  update_bar();
};

