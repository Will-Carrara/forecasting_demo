function requestAPI(url, variable) {
  /* Simple API request to OpenET Raster API*/

  var data = fetch(url)
      .then((response) => {
          return response.json()
      })
      .then((result) => {
          // populate series
          var timeseries = new Array();
          for (i = 0; i < result.length; i++) {
              timeseries.push(result[i][variable]);
          }
          return timeseries
      });

  return data
}
