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
  var variable = 'et'
  var year = '2022'
  var date = new Date();
  var start = 7;// date.getMonth();

  async function makeAPICalls(variable, year, start) {

      // request url  for forecast
      const url2 = `https://openet-raster-api.org/experimental/forecast/warping?end_date=${year}-08-31&interval=monthly&lon=${lon}&lat=${lat}&model=ensemble&variable=${variable}&ref_et_source=gridmet&units=metric&output_file_format=json&admin_key=hello`;
      var forecast = await requestAPI(url2, variable);

      // plot the data
      var chart = plotForecast(forecast, area, variable, start)

      // when the user clicks anywhere outside of the modal, close it
      window.onclick = function(event) {
          if (event.target == modal) {
              modal.style.display = "none";
              chart.destroy();
          };
      };
  }

  // retirve and plot data
  makeAPICalls(variable, year, start)

  // display the modal popup with the graph and loader
  var modal = document.getElementById("graphModal");
  modal.style.display = "block";
  update_bar(10);
}

// add control tools
map.addControl(draw);

// call api
map.on("draw.create", generateGraph);
map.on("draw.delete", null);
map.on("draw.update", generateGraph);