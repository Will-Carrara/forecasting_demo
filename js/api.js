function requestAPI(url, variable) {
  /* Simple API request to OpenET Raster API*/

  var data = fetch(url)
      .then((response) => {
          return response.json();
        })
      .then((result) => {
          // populate series
          var timeseries = [];
          for (i = 0; i < result.length; i++) {
              var parsed_time = new Date(result[i]['time']).getTime()
              timeseries.push([parsed_time, parseFloat(result[i][variable])]);
          };
          return timeseries
      });
  return data;
}
