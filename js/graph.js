function plotForecast(timeseries, area, variable, start) {

    // get chart params
    if (variable == 'et') {
      var fullName = 'Evapotranspiration';
      var subName = 'ET';
      var softMax = 200;
      var yAxisText = `${subName} (mm)`;
      var valueSuffix = ' mm';
    } else if (variable == 'eto') {
      var fullName = 'Reference Evapotranspiration';
      var subName = 'ETo';
      var softMax = 200;
      var yAxisText = `${subName} (mm)`;
      var valueSuffix = ' mm';
    } else if (variable == 'pr') {
      var fullName = 'Precipitation';
      var subName = 'Pr';
      var softMax = 150;
      var yAxisText = `${subName} (mm)`;
      var valueSuffix = ' mm';
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
        range.push([null, null]);
      } else if (i == start) {
        range.push([parseInt(timeseries[i]), parseInt(timeseries[i])]);
      } else {
        range.push([
          parseInt(timeseries[i] * 0.75),
          parseInt(timeseries[i] * 1.25),
        ]);
      }
    }
  
    var chart = new Highcharts.chart({
      chart: {
        renderTo: "container1",
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
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      series: [
        {
          name: subName,
          data: timeseries,
          zoneAxis: "x",
          zones: [
            {
              value: start,
            },
            {
              dashStyle: "dot",
            },
          ],
          tooltip: {
            valueSuffix: valueSuffix,
            valueDecimals: 0
          },
        },
        {
          name: "Range",
          data: range,
          type: "arearange",
          lineWidth: 0,
          linkedTo: ":previous",
          color: "#BEBEBE", // light grey
          fillOpacity: 0.3,
          zIndex: 0,
          marker: {
            enabled: false,
          },
          tooltip: {
            valueSuffix: valueSuffix,
            valueDecimals: 0
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
  
function plotAccuracy(truth, forecast, area, variable, start) {
  
  // get chart params
  if (variable == 'et') {
    var fullName = 'Evapotranspiration';
    var subName = 'ET';
    var softMax = 200;
    var yAxisText = `${subName} (mm)`;
    var valueSuffix = ' mm';
  } else if (variable == 'eto') {
    var fullName = 'Reference Evapotranspiration';
    var subName = 'ETo';
    var softMax = 200;
    var yAxisText = `${subName} (mm)`;
    var valueSuffix = ' mm';
  } else if (variable == 'pr') {
    var fullName = 'Precipitation';
    var subName = 'Pr';
    var softMax = 150;
    var yAxisText = `${subName} (mm)`;
    var valueSuffix = ' mm';
  } else if (variable == 'ndvi') {
    var fullName = 'Normalized Difference Vegetation Index';
    var subName = 'NDVI';
    var softMax = 1;
    var yAxisText = `${subName}`;
    var valueSuffix = '';
  }; 

  var chart = new Highcharts.chart({
    chart: {
      renderTo: "container1",
    },
    title: {
      text: `${fullName} (2021)`,
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    series: [
      // series 1
      {
        name: "Forecasted",
        data: forecast,
        zoneAxis: "x",
        zones: [
          {
            value: start,
          },
          {
            dashStyle: "dot",
          },
        ],
        tooltip: {
          valueSuffix: valueSuffix,
          valueDecimals: 0
        },
      },
      // series 2
      {
        name: "Observed",
        data: truth,
        tooltip: {
          valueSuffix: valueSuffix,
          valueDecimals: 0
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
  