function requestAPI(url, args, variable) {
  /* Simple tile request to OpenET Raster API*/

  async function postData(url = '', data = {}) {

    const response = await fetch(url, {
      method: 'POST',
      //cache: 'no-cache',
      //credentials: 'same-origin',
      headers: {
        'Content-Type':'application/json',
        'Authorization': API_KEY
      },
      body: JSON.stringify(data)
    });
    return response.json().then((result) => {
      // populate series
      var timeseries = [];
      for (i = 0; i < result.length; i++) {
          var parsed_time = new Date(result[i]['time']).getTime()
          timeseries.push([parsed_time, parseFloat(result[i][variable])]);
      };
      return timeseries
  })
}

  var data = postData(url, args)
    .then((response) => {
      return response;
    });
    return data;
};

function requestTiles(url, args) {
  /* Simple tile request to OpenET Raster API*/

  async function postData(url = '', data = {}) {

    const response = await fetch(url, {
      method: 'POST',
      //cache: 'no-cache',
      //credentials: 'same-origin',
      headers: {
        'Content-Type':'application/json',
        'Authorization': API_KEY
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }

  var data = postData(url, args)
    .then((response) => {
      return response;
    });
    return data;
};
