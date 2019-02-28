var chartConfig = {
    "dataLoader": {
        /* SELECT id * 1000, bg FROM diabetes.bg_data;*/
        "url": "datafiles/bgDatabaseChart.json",
        "format": "json",
        "showErrors": true,
        "noStyles": true,
        "async": true
    },
    "type": "serial",
    "theme": "none",
    "marginLeft": 70,
    "marginRight": 70,
    "synchronizeGrid": true,
    "valueAxes": [{
        "id": "v1",
        "axisColor": "#000000",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "left"
        }, {
        "id": "v2",
        "axisColor": "red",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
        }],
    "graphs": [{
            "valueAxis": "v1",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "#000000",
            "useLineColorForBulletBorder": true,
            "title": "Glucose values",
            "valueField": "bg"
  }
        ],
    "chartCursor": {
        "categoryBalloonEnabled": false
    },
    "categoryField": "id",
    "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true,
        "dateFormats": [{
                period: 'fff',
                format: 'JJ:NN:SS'
      }, {
                period: 'ss',
                format: 'JJ:NN:SS'
      }, {
                period: 'mm',
                format: 'JJ:NN'
      }, {
                period: 'hh',
                format: 'JJ:NN'
      }, {
                period: 'DD',
                format: 'DD/MM/YYYY'
      }, //you may need to change the entries for 'WW' and 'MM' as well, depending on the amount of visible data
            {
                period: 'WW',
                format: 'MMM DD'
      }, {
                period: 'MM',
                format: 'MMM'
      }, {
                period: 'YYYY',
                format: 'YYYY'
      }
    ]
    },
    "valueAxes": [{
        "ignoreAxisWidth": true
  }],
    guides: [{
        //value axis guide
        value: 100,
        toValue: 200,
        fillAlpha: .40,
        fillColor: "#008000"
}, {
        value: 0,
        toValue: 100,
        fillAlpha: 0.40,
        fillColor: "#0000FF"
}, {
        value: 200,
        toValue: 10000,
        fillAlpha: 0.40,
        fillColor: "#FF0000"
}],
    "legend": {
        "useGraphSettings": true
    }
};

var chartConfig2 = {
    "dataLoader": {
        "url": "datafiles/ins.json",
        "format": "json",
        "showErrors": true,
        "noStyles": true,
        "async": true
    },
    "type": "serial",
    "theme": "none",
    "marginLeft": 70,
    "marginRight": 70,
    "graphs": [{
        "title": "Ins Bolus",
        "type": "column",
        "lineColor": "#000000",
        "valueField": "bolus_volume_delivered",
        "valueAxis": "v1"
  }, {
        "title": "Ins Basal",
        "valueField": "basal_ins",
        "valueAxis": "v2",
        "lineColor": "red",
  }],
    "chartCursor": {},
    "chartScrollbar": {
        "oppositeAxis": false,
        "offset": 30
    },
    "categoryField": "id",
    "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true,
        "dateFormats": [{
                period: 'fff',
                format: 'JJ:NN:SS'
      }, {
                period: 'ss',
                format: 'JJ:NN:SS'
      }, {
                period: 'mm',
                format: 'JJ:NN'
      }, {
                period: 'hh',
                format: 'JJ:NN'
      }, {
                period: 'DD',
                format: 'DD/MM/YYYY'
      }, //you may need to change the entries for 'WW' and 'MM' as well, depending on the amount of visible data
            {
                period: 'WW',
                format: 'MMM DD'
      }, {
                period: 'MM',
                format: 'MMM'
      }, {
                period: 'YYYY',
                format: 'YYYY'
      }
    ]
    },
    "valueAxes": [{
        "id": "v1",
        "ignoreAxisWidth": true,
        "axisColor": "#000000",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "left"
        }, {
        "id": "v2",
        "ignoreAxisWidth": true,
        "axisColor": "red",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
        }],
    "legend": {
        "useGraphSettings": true
    }
};

var chartConfig3 = {
    "dataLoader": {
        /*SELECT diabetes.hr_data.id * 1000, heart_rate, (x + y + z) as xyz FROM diabetes.hr_data inner join diabetes.acc_data on(diabetes.hr_data.upload_id = diabetes.acc_data.upload_id);*/
        "url": "datafiles/heartRate.json",
        "format": "json",
    },
    "type": "serial",
    "theme": "none",
    "marginLeft": 70,
    "marginRight": 70,
    "graphs": [{
        "title": "Acc data",
        "lineColor": "#000000",
        "valueField": "xyz",
        "valueAxis": "v1"
  }, {
        "title": "Heart rate",
        "valueField": "heart_rate",
        "valueAxis": "v2",
        "lineColor": "red",
  }],
    "chartCursor": {},
    "chartScrollbar": {
        "oppositeAxis": false,
        "offset": 30
    },
    "categoryField": "id",
    "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true,
        "dateFormats": [{
                period: 'fff',
                format: 'JJ:NN:SS'
      }, {
                period: 'ss',
                format: 'JJ:NN:SS'
      }, {
                period: 'mm',
                format: 'JJ:NN'
      }, {
                period: 'hh',
                format: 'JJ:NN'
      }, {
                period: 'DD',
                format: 'DD/MM/YYYY'
      }, //you may need to change the entries for 'WW' and 'MM' as well, depending on the amount of visible data
            {
                period: 'WW',
                format: 'MMM DD'
      }, {
                period: 'MM',
                format: 'MMM'
      }, {
                period: 'YYYY',
                format: 'YYYY'
      }
    ]
    },
    "valueAxes": [{
        "id": "v1",
        "ignoreAxisWidth": true,
        "axisColor": "#000000",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "left"
        }, {
        "id": "v2",
        "ignoreAxisWidth": true,
        "axisColor": "red",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
        }],
    "legend": {
        "useGraphSettings": true
    }
};
var charts = [];
var chart1 = AmCharts.makeChart("chartdiv", chartConfig);
var chart2 = AmCharts.makeChart("chartdiv2", chartConfig2);
var chart3 = AmCharts.makeChart("chartdiv3", chartConfig3);
charts.push(chart1);
charts.push(chart2);
charts.push(chart3);

for (var x in charts) {
    charts[x].addListener("zoomed", syncZoom);
    charts[x].addListener("init", addCursorListeners);
}

function changeTresh() {
    var treshhold1 = parseFloat(document.getElementById("treshhold1").value);
    var treshhold2 = parseFloat(document.getElementById("treshhold2").value);

    console.log(treshhold1);
    console.log(treshhold2);
    if (treshhold1 != 0 && treshhold2 != 0) {
        charts[0].guides[0].value = treshhold1;
        charts[0].guides[0].toValue = treshhold2;

        charts[0].guides[1].toValue = treshhold1;

        charts[0].guides[2].value = treshhold2;

        AmCharts.charts[0].validateData();
    }
}

function zoomMap() {
    var dateFromTemp = document.getElementById("dateFrom").value;
    var dateToTemp = document.getElementById("dateTo").value;

    var dateFrom = new Date(dateFromTemp);
    var dateTo = new Date(dateToTemp)

    chart3.zoomToDates(dateFrom, dateTo);
}

function addCursorListeners(event) {
    event.chart.chartCursor.addListener("changed", handleCursorChange);
    event.chart.chartCursor.addListener("onHideCursor", handleHideCursor);
}

function syncZoom(event) {
    for (x in charts) {
        if (charts[x].ignoreZoom) {
            charts[x].ignoreZoom = false;
        }
        if (event.chart != charts[x]) {
            charts[x].ignoreZoom = true;
            charts[x].zoomToDates(event.startDate, event.endDate);
        }
    }
}

function handleCursorChange(event) {
    for (var x in charts) {
        if (event.chart != charts[x]) {
            charts[x].chartCursor.syncWithCursor(event.chart.chartCursor);
        }
    }
}

function handleHideCursor() {
    for (var x in charts) {
        if (charts[x].chartCursor.hideCursor) {
            charts[x].chartCursor.forceShow = false;
            charts[x].chartCursor.hideCursor(false);
        }
    }
}
