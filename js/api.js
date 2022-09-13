function requestAPI(url, variable) {
  /* Simple timeseries request to OpenET Raster API*/

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


function requestTiles(url, args) {
  /* Simple tile request to OpenET Raster API*/

  // Example POST method implementation:
  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  var data = postData(url, args)
  .then((response) => {
    return response;
  });
  return data;
};
