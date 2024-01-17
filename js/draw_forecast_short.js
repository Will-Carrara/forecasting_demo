// add draw object
const draw = new MapboxDraw({
  displayControlsDefault: false,
  controls: {
      polygon: true,
      trash: true,
  },
});

function generateGraph(e) {
  /* Trigger modal popup and call api*/

  // polygon
  const polygon = e.features[0]

  // calculate geometric center
  const coordinates = turf.center(polygon).geometry.coordinates;
  let lon = coordinates[0];
  let lat = coordinates[1];

  // convert m2 to acres
  let area = (turf.area(polygon) * 0.000247105).toFixed(2);

  // variables of interest
  var today = new Date();
  var end_date = today.toISOString().split('T')[0]
  var month = today.getMonth();

  // FIX THIS MONTHLY
  if (INTERVAL == "daily") {
    var start = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24) - 2
    var steps = 14
    var sd = `2024-01-17`

  } else {
    var start = month
    var steps = 12-month+1
    var sd = `2016-01-01`
  }
  var model = 'ensemble';

  async function makeAPICalls(variable, start) {

     // request url for ground truth
     const url1 = 'http://localhost:8080/raster/timeseries/point';
     var args = {
       "date_range": [
         `2024-01-01`,
         `2024-01-16`
       ],
       "file_format": "json",
       "geometry": [
         lon,
         lat
       ],
       "interval": INTERVAL,
       "model": model,
       "reference_et": "gridMET",
       "units": "mm",
       "variable": variable
     }

     var truth = await requestAPI(url1, args, variable);

      // request url  for forecast
      const url = 'http://localhost:8080/experimental/raster/timeseries/forecasting/fret';
      var args = {
        "date_range": [
          sd,
          end_date
        ],
        //"generations": 3,
       // "speed": "fast_parallel",
       // "steps": steps,
        "file_format": "json",
        "geometry": [
          lon,
          lat
        ],
        //"interval": INTERVAL,
        "model": model,
        "reference_et": "gridMET",
        "units": "mm",
        "variable": variable
      }

      var forecast = await requestAPI(url, args, variable);

      // plot the data
      var chart = plotAccuracy(truth, forecast, area, variable, start)

      // when the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
              chart.destroy();
          };
      };
  }

  // retrieve and plot data
  makeAPICalls(VARIABLE, start)

  // display the modal popup with the graph and loader
  var modal = document.getElementById("graphModal");
  modal.style.display = "block";
  update_bar(30);
}

// add control tools
map.addControl(draw);

// call api
map.on("draw.create", generateGraph);
map.on("draw.delete", null);
map.on("draw.update", generateGraph);