function plotData(timeseries, variable) {
    var chart = new Highcharts.chart({
        chart: {
          renderTo: 'container1',
        },
        title: {
          text: 'Evapotranspiration'
        },
        subtitle: {
          text: '2022 Forecast'
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: `${variable} (mm)`
          },
          max: 200,
          min: 0
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        series: [{
          name: 'ET',
          data: timeseries,
          zoneAxis: 'x',
          zones: [{
            value: 8
          }, {
            dashStyle: 'dot'
            }]
        }]
      });

    return chart 
}

