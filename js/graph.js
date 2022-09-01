function plotForecast(timeseries, area, variable, start) {

    // range calculation
    var range = new Array();
    for (i=0; i < timeseries.length; i++) {
        if (i < start) {
            range.push([null, null]);
        } else if (i == start) {
            range.push([parseInt(timeseries[i]), parseInt(timeseries[i])]);
        } else {
          range.push([parseInt(timeseries[i]*.75), parseInt(timeseries[i]*1.25)]);
        };
    };

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
          softMax: 200,
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
            value: start
          }, {
            dashStyle: 'dot'
            }],
          tooltip: {valueSuffix: ' mm'}
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
        marker: {enabled: false},
        tooltip: {valueSuffix: ' mm'}
        }
    ]});
    return chart 
}


function plotAccuracy(truth, forecast, area, variable, start) {
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
        softMax: 200,
        min: 0
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [
        // series 1
        {
          name: 'Forecasted',
          data: forecast,
          zoneAxis: 'x',
          zones: [{value: start}, {dashStyle: 'dot'}],
          tooltip: {
            valueSuffix: ' mm',
            shared: true
          }
        },
      // series 2
      {
        name: 'Observed',
        data: truth,
        tooltip: {
          valueSuffix: ' mm',
        }
      }
    ]
  });

  return chart 
}

/*
pointFormatter: function() {
  return this.point.key + this.series.name + ": " + this.y + "<br/>(" + parseFloat(this.y * 100 / this.series.chart.series[1].data[this.x].y).toFixed(0) + "%)"
}
*/
