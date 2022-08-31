function plotData(timeseries, range, area, variable) {
    var chart = new Highcharts.chart({
        chart: {
          renderTo: 'container1',
        },
        title: {
          text: 'Evapotranspiration Forecast'
        },
        subtitle: {
          text: `OpenET Ensemble (${parseFloat(area).toLocaleString()} Acres)`
        },
        credits: {
          enabled: false
        },
        yAxis: {
          title: {
            text: `${variable} (mm)`
          },
          max: 220,
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
        },
        {
        name: 'Range',
        data: range,
        type: 'arearange',
        lineWidth: 0,
        linkedTo: ':previous',
        color: '#BEBEBE', // light grey 
        fillOpacity: 0.3,
        zIndex: 0,
        marker: {enabled: false}
        }
    ]});
    return chart 
}

