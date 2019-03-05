/*Voor elke chart die we maken hebben we een aparte chartConfig aangemaakt. Dit is de volledige configuration van de grafiek. Dit kan je ook rechtstreeks doen bij het aanmaken van de grafiek maar op deze manier
is het overzichtelijker.*/
var chartConfig = {
    /* Dataloader wordt gebruikt om de data te laden die je gaat gebruiken in je chart. Bij de url parameter geef je het pad naar de file, met de format parameter geef je het type van je file mee. De andere parameters zijn optioneel en dus niet verplicht.*/
    "dataLoader": {
            /* select bg.id * 1000 as id, bg, UNIX_TIMESTAMP(start_time) * 1000 as unix, duration, sport_type, average_hr,average_speed,calories,fat_percentage_of_calories,food, ci, emotion, (case when bg.id is null then UNIX_TIMESTAMP(start_time) * 1000 else bg.id * 1000 end) as timestam
    from diabetes.bg_data as bg 
        left join diabetes.sport_session as sp on (bg.id = sp.id)
        left join diabetes.diary as di on (bg.id = di.id)
        union
    select  bg.id * 1000 as id, bg, UNIX_TIMESTAMP(start_time) * 1000 as unix, duration, sport_type, average_hr,average_speed,calories,fat_percentage_of_calories,food, ci, emotion, (case when bg.id is null then UNIX_TIMESTAMP(start_time) * 1000 else bg.id * 1000 end) as timestam  
    from diabetes.bg_data as bg 
        right join diabetes.sport_session as sp on (bg.id = sp.id)
        left join diabetes.diary as di on (bg.id = di.id)*/
        "url": "datafiles/bgFoodSport.json",
        "format": "json",
        "showErrors": true,
        "noStyles": true,
        "async": true
    },
    /*    Met de type parameter geef je het soort grafiek weer. In ons geval was serial de beste en makkelijkste optie.*/
    "type": "serial",
    "theme": "none",
    "marginLeft": 70,
    "marginRight": 70,
    "synchronizeGrid": true,
    /*    In de graphs parameter zet je alle grafieken die je in de chart wil laten zien.De parameters hiervoor zijn straight forward.*/
    "graphs": [{
        /*        De title variabele specifieren we zodat deze gebruikt kan worden door de automatisch gegenereerde legende.Dit vindt u verderop in de code.*/
        "title": "Blood glucose",
        "lineColor": "#002757",
        "lineThickness": 2,
        /*        Met valueField zeg je welke variabele uit je dataLoader hij moet gebruiken om de grafiek te tekenen.Dit is dus de waarde op de y - as, de waardes van de x - as specifieer je verderop in de code.*/
        "valueField": "bg",
        /*        Omdat de waardes van de verschillende grafieken uiteenlopend zijn zou hij niet alles mooi kunnen weergeven op dezelfde y - as.Daarom maken we voor elke grafiek een aparte y - as, dit doen we verderop in de code.Met de parameter valueAxis zeg je dus welke y - as hij moet gebruiken om de value op te displayen.*/
        "valueAxis": "v1"
  }, {
        "title": "Food intake",
        /*      Indien je geen type opgeeft gebruikt hij het standaard type van je graph. Dit is in ons geval dus serial, maar we willen sommige grafieken ook als kolom grafieken weergeven. We specifieren dus in deze aparte grafiek dat hij deze als kolom grafiek moet weergeven.*/
        "type": "column",
        /*      balloonText wordt gebruikt om data te displayen in een tekstbalon als je hovert over de waardes.Dit is meestal om extra info bovenop de valueField te displayen.Een variabele haal je uit je dataLoader met dubbele haakjes == > [[]]*/
        "balloonText": "Calory intake: [[ci]] <br>Food: [[food]] <br>I feel: [[emotion]]",
        "valueField": "ci",
        "valueAxis": "v2",
        "lineColor": "#E00049",
        /*      de variabele fillAplhas is om je grafiek in te kleuren. 1 is volledig ingekleurd en niet transparant, hoe dichter bij de nul hoe transparanter de kleur is.*/
        "fillAlphas": 1
  }, {
        "title": "Sport activities",
        "balloonText": "Sport type: [[sport_type]] <br>Duration: [[duration]] <br>Average heart rate: [[average_hr]] <br>Average speed: [[average_speed]] <br>Calories: [[calories]] <br>%Fat of calories: [[fat_percentage_of_calories]]",
        "lineColor": "green",
        "valueField": "duration",
        "valueAxis": "v3",
        "type": "column",
        "fillAlphas": 1,
  }],
    /*    Met de chartCursor variabele geef je alle opties mee wat er gebeurt als je hovert over de chart.*/
    "chartCursor": {
        /*        Omdat we al veel displayen op de chart is het niet overzichtelijk om de value van de x-as (category axis) ook nog eens te displayen. Dit staat automatisch op true, wij zetten deze dus op false zodat de datum niet ook nog eens wordt gedisplayed.*/
        "categoryBalloonEnabled": false
    },
    /*    Hier specifieren we de variabele die gebruikt zal worden op de x - as(category axis), in ons geval dus de datum.*/
    "categoryField": "timestam",
    /*    In de variabele categoryAxis geven we alle opties mee voor de x - as(category axis).*/
    "categoryAxis": {
        /*        Aangezien we uit onze json file unix timestamps halen, worden deze ook weergegeven als timestamps op de grafiek.Met parseDates: true zeggen we dat hij deze moet omzetten naar leesbare data.*/
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true,
        "axisColor": "#002757",
        "color": "#002757",
        /*        Met dateFormats geven we alle mogelijke formaten mee zodat de parseDates variabele weet hoe hij deze data moet omzetten en in welk formaat.*/
        "dateFormats": [{
                /*            Voor meer info over de dateFormats: https: //www.amcharts.com/docs/v4/concepts/formatters/formatting-date-time/*/
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
    /*    Met de variabele valueAxes geven we de opties mee voor de y - as(en)(valueAxes).Hier maken we dus ook meerdere y - assen die we gebruiken in de verschillende grafieken.*/
    "valueAxes": [{
        "id": "v1",
        "ignoreAxisWidth": true,
        "axisColor": "#002757",
        "color": "#002757",
        "axisThickness": 2,
        "axisAlpha": 1,
        /*        Met de position zeggen we waar hij de y - as moet plaatsen.*/
        "position": "left"
        }, {
        "id": "v2",
        "ignoreAxisWidth": true,
        "axisColor": "#E00049",
        "color": "#E00049",
        "axisThickness": 2,
        "axisAlpha": 1,
        "position": "right"
        }, {
        "id": "v3",
        "axisColor": "green",
        "axisThickness": 2,
        "gridAlpha": 0,
        "offset": 50,
        "axisAlpha": 1,
        "position": "right"
        }],
    /*Omdat we tresholds moeten kunnen instellen gebruiken we hiervoor guides.Je kan verticale en horizontale guides maken.Voor de horizontale(die wij dus gebruiken) geef je een value en toValue mee.Voor de verticale doe je hetzelfde maar geef je gewoon een category mee.Deze plaatst hij dan op de waarde op de categoryAxis(x - as).*/
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
        fillColor: "rgba(255, 255, 255, 0.53)"
}, {
        valueAxis: "v1",
        value: 200,
        toValue: 10000,
        fillAlpha: 0.40,
        fillColor: "#FF0000"
}],
    /*    Met de legend variabele geven we de opties voor de legende mee.In ons geval is deze zeer simpel.*/
    "legend": {
        /*        De useGraphSettings spreekt voor zich.Hij gaat met de setting van de graph zijn legende opbouwen.Daarom hebben we dus voor elke graph een titel gedefinieert.Die gebruikt hij dus in de legende met de kleur en type graph.Door de legende parameter kan je automatisch een grafiek aan en uit klikken.Zodat hij deze niet of wel weergeeft.Dit gebeurd dynamisch.*/
        "useGraphSettings": true
    }
};
/*Voor de volgende 2 chartConfigs werkt het identiek aan de eerste chartConfig.*/
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
        "balloonText": "Bolus type: [[bolus_type]] <br>Bolus volume selected: [[bolus_volume_selected]] <br>Bolus volume deliverd: [[bolus_volume_delivered]]",
        "valueField": "bolus_volume_delivered",
        "valueAxis": "v1",
        "fillAlphas": 1
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
        /*SELECT diabetes.hr_data.id * 1000, heart_rate, (sqrt(x^2 + y^2 + z^2)) as xyz FROM diabetes.hr_data inner join diabetes.acc_data on(diabetes.hr_data.upload_id = diabetes.acc_data.upload_id);*/
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
/*Nu we de chartConfigs hebben gedefinieert kunnen we beginnen aan het maken van de grafieken.Hiervoor maken we een array van graphs.*/
var charts = [];
/*Nu maken we voor elke chart apart de chart en voegen deze toe aan de array zodat we hier makkelijker listeners aan kunnen toevoegen. Op de index pagina hebben we voorgemaakte lege divs. In de makeChart functie is de eerste variabele de id van de div op de index pagina, en de 2de variabele is de config settings die hij moet gebruiken voor die graph.*/
var chart1 = AmCharts.makeChart("chartdiv", chartConfig);
var chart2 = AmCharts.makeChart("chartdiv2", chartConfig2);
var chart3 = AmCharts.makeChart("chartdiv3", chartConfig3);
charts.push(chart1);
charts.push(chart2);
charts.push(chart3);

/*Omdat we voor elke chart listeners willen toevoegen gebruiken we een
for loop.*/
for (var x in charts) {
    /*    We willen dat als je op 1 graph zoomed, de andere meezoomen naar dezelfde plaats.Hiervoor hebben we een functie aangemaakt verderop in de code.Hier voegen we deze toe als listener aan listener zoomed(dus als je zoomed op een bepaalde grafiek).*/
    charts[x].addListener("zoomed", syncZoom);
    /*    Als de grafieken worden aangemaakt(init) voegen we nog een listener toe.Deze wordt ook verder uitgelegd.*/
    charts[x].addListener("init", addCursorListeners);
}

/*Omdat we willen dat men de treshold van de grafiek dynamisch kan veranderen, maken we hier een functie voor.De functie haalt de waardes op van de input fields op de index pagina, en gaat de guides hierop aanpassen.*/
function changeTresh() {
    /*    Met deze lijnen code halen we de waardes binnen uit de index pagina en parsen dit naar een float omdat het binnen komt als een string.*/
    var treshhold1 = parseFloat(document.getElementById("treshhold1").value);
    var treshhold2 = parseFloat(document.getElementById("treshhold2").value);

    /*    Als deze waardes niet 0 zijn gaat hij de value en toValue van de guides aanpassen.*/
    if (treshhold1 != 0 && treshhold2 != 0) {
        charts[0].guides[0].value = treshhold1;
        charts[0].guides[0].toValue = treshhold2;

        charts[0].guides[1].toValue = treshhold1;

        charts[0].guides[2].value = treshhold2;

        /*        Omdat hij de grafiek terug opnieuw moet tekenen om de veranderingen te zien gebruiken we de validateData() functie.Deze gaat basically gewoon de grafiek hertekenen en checken of alle instellingen kloppen.*/
        AmCharts.charts[0].validateData();
    }
}

/*Om te kunnen zoomen tussen 2 verschillende data hebben we een functie gemaakt die weeral de waardes uit de juiste input velden van de index pagina binnen haalt, en dan de map gaat zoomen tussen deze data met de voorgemaakte functie zoomToDates(dateFrom, dateTo).Aangezien alle grafieken gesynchronizeerd zijn moeten we dit maar op 1 grafiek toepassen want de andere grafieken zoomen gewoon mee. Deze functie gebruiken we ook om de kalender te synchronizeren met de grafieken.*/
function zoomMap() {
    setTimeout(function () {
        var month = document.getElementsByClassName("graph-label")[0].innerHTML;
        document.getElementById("monthHeader").innerHTML = month;
    }, 1000)
    /*    Eerst vernietigen we de huidige kalender.*/
    destroyCalender();
    /*    We halen de waardes binnen van de input velden als string.*/
    var dateFromTemp = document.getElementById("dateFrom").value;
    var dateToTemp = document.getElementById("dateTo").value;

    /*    We zetten deze strings om naar data.*/
    var dateFrom = new Date(dateFromTemp);
    var dateTo = new Date(dateToTemp)

    /*    Als de from date voor de to date is mag hij zoomen tussen deze data, anders moet hij een error geven.*/
    if (dateFrom < dateTo) {
        chart3.zoomToDates(dateFrom, dateTo);
    } else {
        alert("De van datum moet voor de tot datum zijn!")
    }
    /*    als de dateFrom field leeg is, gebruikt hij de huidige datum.*/
    if (dateFromTemp == "") {
        return setData(new Date());
    }
    return setData(new Date(dateFrom));
}

function addCursorListeners(event) {
    event.chart.chartCursor.addListener("changed", handleCursorChange);
    event.chart.chartCursor.addListener("onHideCursor", handleHideCursor);
}
/*Met deze functie zorgen we dat de zoomfunctie van de grafieken gesynchronizeerd is weer met behulp van de zoomToDates functie.*/
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
/*Deze functie is om de cursors te synchronizeren per chart.*/
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
