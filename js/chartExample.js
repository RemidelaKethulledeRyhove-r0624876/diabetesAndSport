var chartConfig = {
    "dataLoader": {
        /* select bg.id * 1000 as id, bg, UNIX_TIMESTAMP(start_time) * 1000, duration, sport_type, average_hr,average_speed,calories,fat_percentage_of_calories,food, ci, emotion  from diabetes.bg_data as bg 
	left join diabetes.sport_session as sp on (bg.id = sp.id)
    left join diabetes.diary as di on (bg.id = di.id)
    union
select bg.id * 1000 as id, bg, UNIX_TIMESTAMP(start_time) * 1000, duration, sport_type, average_hr,average_speed,calories,fat_percentage_of_calories,food, ci, emotion   from diabetes.bg_data as bg 
	right join diabetes.sport_session as sp on (bg.id = sp.id)
    left join diabetes.diary as di on (bg.id = di.id)*/
        "url": "datafiles/bgFoodSport.json",
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
    "graphs": [{
        "title": "Blood glucose",
        "lineColor": "#000000",
        "valueField": "bg",
        "valueAxis": "v1"
  }, {
        "title": "Food intake",
        "type": "column",
        "balloonText": "Calory intake: [[ci]] <br>Food: [[food]] <br>I feel: [[emotion]]",
        "valueField": "ci",
        "valueAxis": "v2",
        "lineColor": "red",
  }],
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
    guides: [{
            //value axis guide
            valueAxis: "v1",
            value: 100,
            toValue: 200,
            fillAlpha: .40,
            fillColor: "#008000"
}, {
            valueAxis: "v1",
            value: 0,
            toValue: 100,
            fillAlpha: 0.40,
            fillColor: "#0000FF"
}, {
            valueAxis: "v1",
            value: 200,
            toValue: 10000,
            fillAlpha: 0.40,
            fillColor: "#FF0000"
},
        {
            category: "UNIX_TIMESTAMP(start_time)",
            fillAlpha: 1,
            fillColor: "black",
            "balloonText": "Sport type: [[sport_type]] <br>Duration: [[duration]] <br>Average heart rate: [[average_hr]] <br>Average speed: [[average_speed]] <br>Calories: [[calories]] <br>%Fat of calories: [[fat_percentage_of_calories]]"
            }],
    "legend": {
        "useGraphSettings": true
    }
};

var chartConfig2 = {
    "dataLoader": {
        /*SELECT bol.id * 1000 as id, bolus_type, bolus_volume_selected, bolus_volume_delivered, basal_ins FROM diabetes.bolus_ins_data as bol inner join diabetes.basal_ins_data as bas on(bol.upload_id = bas.upload_id);*/
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
    "synchronizeGrid": true,
    "graphs": [{
        "title": "Ins Bolus",
        "type": "column",
        "lineColor": "#000000",
        "balloonText": "Bolus type: [[bolus_type]] <br>Bolus volume selected: [[bolus_volume_selected]] <br>Bolus volume deliverd: [[bolus_volume_deliverd]]",
        "valueField": "bolus_volume_delivered",
        "valueAxis": "v1"
  }, {
        "title": "Ins Basal",
        "valueField": "basal_ins",
        "valueAxis": "v2",
        "lineColor": "red",
  }],
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
    "chartCursor": {
        "categoryBalloonEnabled": false
    },
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
    destroyCalender();
    var dateFromTemp = document.getElementById("dateFrom").value;
    var dateToTemp = document.getElementById("dateTo").value;

    var dateFrom = new Date(dateFromTemp);
    var dateTo = new Date(dateToTemp)

    chart3.zoomToDates(dateFrom, dateTo);

    if (dateFromTemp == "") {
        return setData(new Date(2019, 0, 1));
    }
    return setData(new Date(dateFrom));
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
