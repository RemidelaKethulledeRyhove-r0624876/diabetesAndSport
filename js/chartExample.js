var chartConfig = {
/*    "dataSets" : [
         {
		title: "Glucose",
		fieldMappings: [ {
			fromField: "Historie glucose (mg/dL)",
			toField: "Historie glucose (mg/dL)"
		}],
		dataLoader: {
            "url": "datafiles/dateParsed.json",
        "format": "json",
        "showErrors": true,
        "noStyles": true,
        "async": true
		},
		categoryField: "Tijd"
	}, {
		title: "Voeding",
		fieldMappings: [ {
			fromField: "Ingeschatte hoeveelheid koolhydraten",
			toField: "Ingeschatte hoeveelheid koolhydraten"
		}, {
			fromField: "Aantal eenheden insuline",
			toField: "Aantal eenheden insuline"
		} ],
		dataLoader: {
                    "url": "datafiles/voedingsdagboek.json",
                    "format": "json",
                    "showErrors": true,
                    "noStyles": true,
                    "async": true
		},
		categoryField: "Tijd"
	}
    ],*/
/*        "datasets": [
            {
                "title": "Voedingsdagboek",
                "dataLoader": {
                    "url": "datafiles/voedingsdagboek.json",
                    "format": "json",
                    "showErrors": true,
                    "noStyles": true,
                    "async": true
                }
            },*/
            /*{*/
    "dataLoader": {
        "url": "datafiles/dateParsed.json",
        "format": "json",
        "showErrors": true,
        "noStyles": true,
        "async": true
    },
/*    }]*/
/*    ,*/
    "type": "serial",
    "theme": "none",
    "marginLeft": 70,
    "synchronizeGrid": true,
    "dataDateFormat": "DD-MM-YYYY JJ:NN",
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
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "title": "Glucose values",
            "valueField": "Historie glucose (mg/dL)"
  }/*
        , {
                "valueAxis": "v2",
                "columnWidth": 20,
                "title": "Food",
                "valueField": "Ingeschatte hoeveelheid koolhydraten"
          }*/
        ],
    "chartCursor": {
        "categoryBalloonEnabled": false
    },
    "categoryField": "Tijd",
    "categoryAxis": {
        "parseDates": true,
        "minPeriod": "hh",
        "dashLength": 1,
        "minorGridEnabled": true,
        "labelsEnabled": true,
        "tickLength": 0
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
}]
};

var chartConfig2 = {
    "dataLoader": {
        "url": "datafiles/dateParsed.json",
        "format": "json",
        "showErrors": true,
        "noStyles": true,
        "async": true
    },
    "type": "serial",
    "theme": "none",
    "marginLeft": 70,
    "pathToImages": "https://www.amcharts.com/lib/3/images/",
    "dataDateFormat": "DD/MM/YYYY JJ:NN",
    "graphs": [{
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineColor": "#000000",
        "lineThickness": 2,
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "Historie glucose (mg/dL)"
  }],
    "chartCursor": {
        "categoryBalloonEnabled": false
    },
    "categoryField": "Tijd",
    "categoryAxis": {
        "parseDates": true,
        "minPeriod": "hh",
        "dashLength": 1,
        "minorGridEnabled": true,
        "labelsEnabled": true,
        "tickLength": 0
    },
    "valueAxes": [{
        "ignoreAxisWidth": true
  }]
};

var chartConfig3 = {
    "dataLoader": {
        "url": "datafiles/dateParsed.json",
        "format": "json",
    },
    "type": "serial",
    "theme": "none",
    "marginLeft": 70,
    "pathToImages": "https://www.amcharts.com/lib/3/images/",
    "dataDateFormat": "DD/MM/YYYY JJ:NN",
    "graphs": [{
        "bullet": "round",
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "bulletSize": 5,
        "hideBulletsCount": 50,
        "lineThickness": 2,
        "lineColor": "#000000",
        "title": "red line",
        "useLineColorForBulletBorder": true,
        "valueField": "Historie glucose (mg/dL)"
  }],
    "chartCursor": {},
    "chartScrollbar": {
        "oppositeAxis": false,
        "offset": 30
    },
    "categoryField": "Tijd",
    "categoryAxis": {
        "parseDates": true,
        "minPeriod": "hh",
        "dashLength": 1,
        "minorGridEnabled": true
    },
    "valueAxes": [{
        "ignoreAxisWidth": true
  }]
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
