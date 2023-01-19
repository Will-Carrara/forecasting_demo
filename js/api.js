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

  async function postData(url = '', data = {}) {
   
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
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
