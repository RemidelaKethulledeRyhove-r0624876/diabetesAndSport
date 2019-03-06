/* In dit deel vind u al de code om de kalender te initialiseren en aan te passen wanneer nodig */
/* variabele van de kalender als null waarde */
var cal = null;

/* setdata() wordt als eerste opgeroepen bij het laden van de pagina, toont de kalender met de huidige maand */
setData();

/* Roept de methode op om de maandelijkse kalender te tonen + zet de header van de pagina op de juiste datum */
function init(dayAverage, monthlyAverage, startdate) {
    monthDate(dayAverage, monthlyAverage, startdate);
    var month = document.getElementsByClassName("graph-label")[0].innerHTML;
    document.getElementById("monthHeader").innerHTML = month;
}

/* functie om de huidige kalender te verwijderen */ 
function destroyCalender() {
    cal.destroy();
}

/* zoomfuctie om de grafieken mee te laten inzoomen op de bepaalde dag */
function zoom(date) {
    var dateFromTemp = date;
    var dateFrom = new Date(dateFromTemp);
    var dateT = new Date(dateFromTemp);
    day = dateT.getDate() + 1;
    var timestam = dateT.setDate(day);
    var dateTo = new Date(timestam);

    chart3.zoomToDates(dateFrom, dateTo);
}

/* Indien men terug wil gaan naar het maandoverzicht gaan de grafieken ook uitzoomen om heel de maand te tonen*/
function zoomOut(date){
    console.log(date);
    var dateFrom = new Date(date);
    chart3.zoomToDates(dateFrom, dateFrom);
}

/* Met de functie monthDate maakt men de kalenders voor 1 bepaalde maand aan, de variabele dayaverage geeft een lijst terug met de gemiddelde waarden (timestamp en Historie glucose (mg/dL)) voor 1 bepaalde dag (wordt doorgegeven aan de daydate functie). De variabele monthlyAverage geeft een lijst met de gemiddelde  waarden per dag terug en wordt in deze maandelijkse kalender gebruikt. Startdate is de dag waarop de kalender moet starten. */
function monthDate(dayAverage, monthlyAverage, startdate) {
    cal = new CalHeatMap();
    cal.init({
        id: "#cal-heatmap",
        itemNamespace: "cal",
        data: monthlyAverage,
        domain: "month",
        subDomain: "x_day",
        start: startdate,
        subDomainTextFormat: "%d",
        cellSize: 60,
        legendCellSize: 20,
        itemName: ["Historie glucose (mg/dL)"],
        legend: [100, 200],
        domainDynamicDimension: false,
        range: 1,
        rowLimit: 8,
        domainGutter: 20,
        nextSelector: "#next",
        previousSelector: "#previous",
        verticalOrientation: true,
        domainLabelFormat: "%b %Y",
        onClick: function (date, nb) {
            /* Hier wordt de nieuwe grafiek per dag opgeroepen en de huidige kalender vernietigd*/
            newButtons();
            document.getElementById("back").onclick = function () {
                cal.destroy();
                startdate = date;
                monthDate(dayAverage, monthlyAverage, startdate);
                newButtons();
                zoomOut(date);
            }
            dayData(date, dayAverage);
            zoom(date);
        },
        label: {
            position: "top",
            align: "center",
            height: 50,
        },
        legendColors: {
            empty: "#ededed",
            min: "#f8ff40",
            max: "#ff3343"
        },
    });
}

/* De funcie dayData wordt gebruikt om de grafieken per dag te maken. De variabele date is deze datum en de variable dayAverage is een lijst met de gemiddeldes per uur (timestamp en Historie glucose (mg/dL))  */
function dayData(date, dayAverage) {
    var i = 0;
    cal.destroy();
    cal = new CalHeatMap();
    cal.init({
        id: "#cal-heatmap",
        data: dayAverage,
        itemNamespace: "cal2",
        domain: "day",
        subDomain: "x_hour",
        start: new Date(date),
        /* Hier wordt berekend wat de waardes zijn van de uren om de uren in te vullen in de kalender */
        subDomainTextFormat: function (date) {
            i += 1;
            if (i == 49) {
                i = 1;
            }
            if (i > 24) {
                return i - 25 + "h";
            }
            if (i < 24) {
                return date.getHours() + "h";
            }
        },
        cellSize: 60,
        legendCellSize: 20,
        itemName: ["Historie glucose (mg/dL)"],
        legend: [100, 200],
        colLimit: 2,
        displayLegend: false,
        range: 1,
        domainLabelFormat: "%d %b %Y",
        verticalOrientation: true,
        nextSelector: "#next",
        previousSelector: "#previous",
        label: {
            position: "top",
        },
        legendColors: {
            empty: "#ededed",
            min: "#f8ff40",
            max: "#ff3343"
        },
    });
}

/* Met de functie setData gaat men de 2 lijsten met data aanmaken en in het juiste formaat plaatsen, dit wordt enkel bij het laden van de pagina opgeroepen. Als output krijgen we dan deze twee lijsten met gemiddelde per dag en gemiddelde per uur ("Historie glucose (mg/dL)") met telkens de juiste timestamp bij. Indien men later naar een API-call wil veranderen moeten we dit ook hier doen en de json-file aanpassen. Na deze functie wordt automatisch de eerste maandgrafiek gemaakt. */
function setData(startdate) {
    var monthlyAverage = {};
    var numberofTimes = {};
    var firsttime = true;
    var numbers = 1;
    var first = 0;

    var dayAverage = {};
    var numberofTimesday = {};
    var numbersday = 1;
    if (startdate == null) {
        startdate = new Date();
}

    d3.json("datafiles/bgFoodSport.json", function (data) {
        var date;
        data.forEach(function (d) {
            d.glucose = +d.bg;

            if (d.id !== "NULL") {
                d.id = +d.id;
                d.id = d.id / 1000;
                if (firsttime == true) {
                    monthlyAverage[d.id] = d.glucose;
                    numberofTimes[getdhm(d.id)] = numbers;
                    dayAverage[d.id] = d.glucose;
                    numberofTimesday[getdhmh(d.id)] = numbersday;
                    firsttime = false;
                    first = d.id;
                }
                var equalItem = false;
                Object.keys(monthlyAverage).forEach(function (item) {
                    if (getdhm(item) == getdhm(d.id) && first != d.id) {
                        equalItem = true;
                        monthlyAverage[item] += d.glucose;
                        numberofTimes[getdhm(d.id)] += 1;
                    }
                });
                if (equalItem == false && first != d.id) {
                    monthlyAverage[d.id] = d.glucose;
                    numberofTimes[getdhm(d.id)] = numbers;
                }

                var equalItemday = false;
                Object.keys(dayAverage).forEach(function (item) {
                    if (getdhmh(item) == getdhmh(d.id) && first != d.id) {
                        equalItemday = true;
                        dayAverage[item] += d.glucose;
                        numberofTimesday[getdhmh(d.id)] += 1;
                    }
                });
                if (equalItemday == false && first != d.id) {
                    dayAverage[d.id] = d.glucose;
                    numberofTimesday[getdhmh(d.id)] = numbersday;
                }
            }
        });
        Object.keys(monthlyAverage).forEach(function (item) {
            monthlyAverage[item] = monthlyAverage[item] / numberofTimes[getdhm(item)];
        })
        Object.keys(dayAverage).forEach(function (item) {
            dayAverage[item] = dayAverage[item] / numberofTimesday[getdhmh(item)];
        })
        return init(dayAverage, monthlyAverage, startdate);

    })
}

/* getdhm is een functie die wordt gebruikt om te kunnen vergelijken in setData of de verschillende timestamps op dezelfde dag vallen*/
function getdhm(timestamp) {
    var timestam = timestamp * 1000;
    var date = new Date(timestam);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    var formattedTime = month + '/' + day + '/' + year;
    return formattedTime;
}

/* getdhmh is een functie die wordt gebruikt om te kunnen vergelijken in setData of de verschillende timestamps op hetzelfde uur vallen* */
function getdhmh(timestamp) {
    var timestam = timestamp * 1000;
    var date = new Date(timestam);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear()
    var hour = date.getHours();

    var formattedTime = hour + '/' + month + '/' + day + '/' + year;
    return formattedTime;
}

/* de functie newbuttons zorgt ervoor dat de "terug naar maand" button enkel werkt bij de dag-kalender */
function newButtons() {
    if (document.getElementById("back").style.display == "none") {
        document.getElementById("back").style.display = "inline";

    } else {
        document.getElementById("back").style.display = "none";
    }
}

/* Deze functie wordt steeds uitgevoerd eens we op "volgende" drukken, deze zet de juiste nieuwe kalender en past de grafieken ook aan*/
document.getElementById("next").onclick = function () {
    setTimeout(function () {
        var month = document.getElementsByClassName("graph-label")[0].innerHTML;
        zoom(new Date(month));
        document.getElementById("monthHeader").innerHTML = month;
    }, 1000)
}

/* Deze functie wordt steeds uitgevoerd eens we op "vorige" drukken, deze zet de juiste nieuwe kalender en past de grafieken ook aan*/
document.getElementById("previous").onclick = function () {
    setTimeout(function () {
        var month = document.getElementsByClassName("graph-label")[0].innerHTML;
        zoom(new Date(month));
        document.getElementById("monthHeader").innerHTML = month;
    }, 1000)
}
