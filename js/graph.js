function plotForecast(timeseries, area, variable, start) {
    // change hover pop up for daily
    if (INTERVAL == "daily") {
      var xDateFormat = '%b, %e'
    } else {
      var xDateFormat = '%b, %Y'
    }

    // get chart params
    if (variable == 'et') {
      var fullName = 'Evapotranspiration';
      var subName = 'ET';
      var softMax = 12;
      var yAxisText = `${subName} (mm)`;
      var valueSuffix = ' mm';
    } else if (variable == 'eto') {
      var fullName = 'Reference Evapotranspiration';
      var subName = 'ETo';
      var softMax = 12;
      var yAxisText = `${subName} (mm)`;
      var valueSuffix = ' mm';
    } else if (variable == 'pr') {
      var fullName = 'Precipitation';
      var subName = 'Pr';
      var softMax = 12;
      var yAxisText = `${subName} (mm)`;
      var valueSuffix = ' mm';
    } else if (variable == 'etof') {
      var fullName = 'Fraction of Reference Evapotranspiration';
      var subName = 'ETof';
      var softMax = 1;
      var yAxisText = `${subName}`;
      var valueSuffix = '';
    } else if (variable == 'ndvi') {
      var fullName = 'Normalized Difference Vegetation Index';
      var subName = 'NDVI';
      var softMax = 1;
      var yAxisText = `${subName}`;
      var valueSuffix = '';
    };

    // range calculation
    var range = new Array();
    for (i = 0; i < timeseries.length; i++) {
      if (i < start) {
        range.push([timeseries[i][0], null, null]);
     } else if (i == start) {
       range.push(
         [timeseries[i][0], timeseries[i][1], timeseries[i][1]],
        );
      } else {
        range.push(
          [timeseries[i][0], parseFloat(timeseries[i][1] * 0.75), parseFloat(timeseries[i][1] * 1.25)],
        );
      };
    }

    var chart = Highcharts.chart("container1", {
      chart: {
        //renderTo: "container1",
        zoomType: 'x',
        scrollablePlotArea: {
            minWidth: 600,
            scrollPositionX: 1
        }
      },
      title: {
        text: `${fullName} Forecast`,
      },
      subtitle: {
        text: `OpenET Ensemble (${parseFloat(area).toLocaleString()} Acres)`,
      },
      credits: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: yAxisText,
        },
        softMax: softMax,
        min: 0,
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 30 * 24 * 3600 * 1000, // one month
        labels: {
          formatter: function() {
            return Highcharts.dateFormat('%b', this.value);
          }
        }
      },
      series: [
        {
          name: subName,
          data: timeseries,
          zoneAxis: "x",
          zones: [
            {
              value: timeseries[start][0],
            },
            {
              dashStyle: "dot",
            },
          ],
          tooltip: {
            valueSuffix: valueSuffix,
            valueDecimals: 2,
            xDateFormat: xDateFormat
          },
        },
        {
          name: "Range",
          data: range,
          type: "arearange",
          lineWidth: 0,
         // linkedTo: ":previous",
          color: "#BEBEBE", // light grey
          fillOpacity: 0.3,
          zIndex: 0,
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: valueSuffix,
            valueDecimals: 2,
            xDateFormat: xDateFormat
          },
        }
      ],
      exporting: {
        buttons: {
          contextButton: {
            menuItems: [
              "viewFullscreen",
              "printChart",
              "separator",
              "downloadPNG",
              "downloadPDF",
              "separator",
              "downloadCSV",
              "downloadXLS",
            ],
          },
        },
      },
    });
    return chart;
};

function plotAccuracy(truth, forecast, area, variable, start) {

  // chang hover pop up for daily
  if (INTERVAL == "daily") {
    var xDateFormat = '%b, %e'
  } else {
    var xDateFormat = '%b, %Y'
  }

  // get chart params
  if (variable == 'et') {
    var fullName = 'Evapotranspiration';
    var subName = 'ET';
    var softMax = 12;
    var yAxisText = `${subName} (mm)`;
    var valueSuffix = ' mm';
  } else if (variable == 'eto') {
    var fullName = 'Reference Evapotranspiration';
    var subName = 'ETo';
    var softMax = 12;
    var yAxisText = `${subName} (mm)`;
    var valueSuffix = ' mm';
  } else if (variable == 'pr') {
    var fullName = 'Precipitation';
    var subName = 'Pr';
    var softMax = 12;
    var yAxisText = `${subName} (mm)`;
    var valueSuffix = ' mm';
  } else if (variable == 'etof') {
    var fullName = 'Fraction of Reference Evapotranspiration';
    var subName = 'ETof';
    var softMax = 1;
    var yAxisText = `${subName}`;
    var valueSuffix = '';
  } else if (variable == 'ndvi') {
    var fullName = 'Normalized Difference Vegetation Index';
    var subName = 'NDVI';
    var softMax = 1;
    var yAxisText = `${subName}`;
    var valueSuffix = '';
  };

  var chart = Highcharts.chart("container1", {
    chart: {
      //renderTo: "container1",
      zoomType: 'x',
      scrollablePlotArea: {
          minWidth: 600,
          scrollPositionX: 1
      }
    },
    title: {
      text: `2022 ${fullName}`,
    },
    subtitle: {
      text: `OpenET Ensemble (${parseFloat(area).toLocaleString()} Acres)`,
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: yAxisText,
      },
      softMax: softMax,
      min: 0,
    },
    xAxis: {
      type: 'datetime',
      tickInterval: 30 * 24 * 3600 * 1000, // one month
      labels: {
        formatter: function() {
          return Highcharts.dateFormat('%b', this.value);
        }
      }
    },
    series: [
      // series 1
      {
        name: "Forecasted",
        data: forecast,
        color: "#36454f",
        zoneAxis: "x",
        zones: [
          {
            // BUG for daily and monthly (Can be given date or epoch)
            value: start,
          },
          {
            dashStyle: "dot",
          },
        ],
        tooltip: {
          valueSuffix: valueSuffix,
          valueDecimals: 2,
          xDateFormat: xDateFormat
        },
      },
      // series 2
      {
        name: "Observed",
        data: truth,
        tooltip: {
          valueSuffix: valueSuffix,
          valueDecimals: 2,
          xDateFormat: xDateFormat
        },
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          menuItems: [
            "viewFullscreen",
            "printChart",
            "separator",
            "downloadPNG",
            "downloadPDF",
            "separator",
            "downloadCSV",
            "downloadXLS",
          ],
        },
      },
    },
  });

  return chart;
};

/*
pointFormatter: function() {
return this.point.key + this.series.name + ": " + this.y + "<br/>(" + parseFloat(this.y * 100 / this.series.chart.series[1].data[this.x].y).toFixed(0) + "%)"
}
*/
