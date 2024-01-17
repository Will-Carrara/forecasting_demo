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
  var today = new Date(`2023-0${MONTH}-01`)
  var year = today.getFullYear()
  if (INTERVAL == "daily"){
    var start = today
    var steps = 14
    var sd = new Date(`2023-01-01`)

  } else {
    var start = today.getMonth()+1;
    var steps = 12-MONTH+1
    var sd = `2016-01-01`
  }
  var model = 'ensemble';


  async function makeAPICalls(variable, year, start) {

      // request url for ground truth
      const url = 'http://localhost:8080/raster/timeseries/point';
      var args = {
        "date_range": [
          `${year}-01-01`,
          `${year}-12-31`
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
      var truth = await requestAPI(url, args, variable);

      // request url  for forecast
      const url2 = 'http://localhost:8080/experimental/raster/timeseries/forecasting/fret';
      var args2 = {
        "date_range": [
          sd,
         `${year}-0${MONTH}-02`
        ],
        "generations": 3,
        "speed": "fast_parallel",
        "steps": steps,
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

      var forecast = await requestAPI(url2, args2, variable);

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
  makeAPICalls(VARIABLE, year, start)

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
