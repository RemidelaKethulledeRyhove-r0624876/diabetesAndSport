var dataset = null


function init(dayAverage, monthlyAverage, startdate) {
    dataset = monthlyAverage;
    monthDate(dayAverage, monthlyAverage, startdate);
    var month = document.getElementsByClassName("graph-label")[0].innerHTML;
    document.getElementById("monthHeader").innerHTML = month;
    /*cal = new CalHeatMap();
    cal.init({

        id: "#cal-heatmap",
        itemNamespace: "cal",
        data: monthlyAverage,
        dataType: "txt",
        domain: "month",
        start: startdate,
        subDomainTextFormat: "%d",
        cellSize: 20,
        legendCellSize: 20,
        itemName: ["Historie glucose (mg/dL)"],
        legend: [100, 200],
        colLimit: 66,
        domainDynamicDimension: false,
        range: 12,
        verticalOrientation: true,
        onClick: function (date, nb) {
            var cal2 = new CalHeatMap();
            dayData(date, dayAverage, cal2);
            zoom(date);
        },
        label: {
            position: "left",
        },
        legendColors: {
            empty: "#ededed",
            min: "#40ffd8",
            max: "#f20013"
        },
    });*/
}
var cal = null;

function destroyCalender() {
    cal.destroy();
}

function zoom(date) {
    //destroyCalender();
    var dateFromTemp = date;
    var dateFrom = new Date(dateFromTemp);
    var dateT = new Date(dateFromTemp);
    day = dateT.getDate() + 1;
    var timestam = dateT.setDate(day);
    var dateTo = new Date(timestam);

    chart3.zoomToDates(dateFrom, dateTo);
}
setData();


function monthDate(dayAverage, monthlyAverage, startdate) {
    cal = new CalHeatMap();
    cal.init({

        id: "#cal-heatmap",
        itemNamespace: "cal",
        data: monthlyAverage,
        dataType: "txt",
        domain: "month",
        subDomain: "x_day",
        start: startdate,
        subDomainTextFormat: "%d",
        cellSize: 60,
        legendCellSize: 20,
        itemName: ["glucose"],
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
            newButtons();
            document.getElementById("back").onclick = function () {
                cal.destroy();
                startdate = date;
                monthDate(dayAverage, monthlyAverage, startdate);
                newButtons();
                zoom(date);
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

function dayData(date, dayAverage) {
    var i = 0;
    cal.destroy();
    cal = new CalHeatMap();
    cal.init({
        id: "#cal-heatmap",
        data: dayAverage,
        itemNamespace: "cal2",
        dataType: "txt",
        domain: "day",
        subDomain: "x_hour",
        subDomainTextFormat: "%c",
        start: new Date(date),
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

function closeGraph(id) {
    var toRemove1 = document.getElementById("container" + id);
    var toRemove2 = document.getElementById(id);
    toRemove1.parentNode.removeChild(toRemove1);
    toRemove2.parentNode.removeChild(toRemove2);
}

function setData(startdate) {
    //var stats = {};
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

function getdhm(timestamp) {
    var timestam = timestamp * 1000;
    var date = new Date(timestam);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    var formattedTime = month + '/' + day + '/' + year;
    return formattedTime;
}

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



function newButtons() {
    if (document.getElementById("back").style.display == "none") {
        document.getElementById("back").style.display = "inline";

    } else {
        document.getElementById("back").style.display = "none";
    }
}

document.getElementById("next").onclick = function () {
    setTimeout(function () {
        var month = document.getElementsByClassName("graph-label")[0].innerHTML;
        document.getElementById("monthHeader").innerHTML = month;
    }, 1000)
}

document.getElementById("previous").onclick = function () {
    setTimeout(function () {
        var month = document.getElementsByClassName("graph-label")[0].innerHTML;
        document.getElementById("monthHeader").innerHTML = month;
    }, 1000)
}
