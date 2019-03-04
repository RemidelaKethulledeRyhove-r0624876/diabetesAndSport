var dataset = null
function init(dayAverage, monthlyAverage, startdate) {
    dataset = monthlyAverage;
    cal = new CalHeatMap();
    cal.init({

        id: "#cal-heatmap",
        itemNamespace: "cal",
        data: monthlyAverage,
        dataType: "txt",
        domain: "month",
        subDomain:"x_day",
        start: new Date(2019, 0, 1),
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
        onClick: function (date, nb) {
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
            min: "#40ffd8",
            max: "#f20013"
        },
    });
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
    day = dateT.getDate()+1;
    var timestam = dateT.setDate(day);
    var dateTo = new Date(timestam);

    chart3.zoomToDates(dateFrom, dateTo);
}
setData();


function monthDate(monthNr){
    destroyCalender();
    cal = new CalHeatMap();
    cal.init({
        id: "#cal-heatmap",
        itemNamespace: "cal",
        data: dataset,
        dataType: "txt",
        domain: "month",
        subDomain:"x_day",
        subDomainTextFormat: "%h",
        start: new Date(2019, 0, 1),
        subDomainTextFormat: "%d",
        cellSize: 60,
        legendCellSize: 20,
        itemName: ["glucose"],
        legend: [100, 200],
        domainDynamicDimension: false,
        range: 1,
        domainGutter: 20,
        verticalOrientation: true/*,
        onClick: function (date, nb) {
            console.log(nb + "nb");
            var cal2 = new CalHeatMap();
            dayData(date, stats, cal2);
        }*/,
        label: {
            position: "left",
        },
        legendColors: {
            empty: "#ededed",
            min: "#40ffd8",
            max: "#f20013"
        },
    });
}

function dayData(date, dayAverage) {
    cal.destroy();
    cal = new CalHeatMap();
    cal.init({
        id: "#cal-heatmap",
        data: dayAverage,
        itemNamespace: "cal2",
        dataType: "txt",
        domain: "day",
        subDomain: "x_hour",
        start: new Date(date),
        cellSize: 40,
        legendCellSize: 20,
        itemName: ["Historie glucose (mg/dL)"],
        legend: [100, 200],
        rowlLimit: 8,
        displayLegend: false,
        range: 1,
        verticalOrientation: true,
        label: {
            position: "left",
        },
        legendColors: {
            empty: "#ededed",
            min: "#40ffd8",
            max: "#f20013"
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
        startdate = new Date(2019, 0, 1);
    }

    d3.json("datafiles/bgDatabase.json", function (data) {
        var date;
        data.forEach(function (d) {
            //d.Tijd += ":00";
            //d.glucose = d["Historie glucose (mg/dL)"];
            d.glucose = +d.bg;
            d.id = +d.id;
            //if (d.Tijd.substring(0, 2).includes("/")) {
            //    d.Tijd = "0" + d.Tijd;
            //}
            //var dateString = d.Tijd.substr(3, 2) + "/" + d.Tijd.substr(0, 2) + "/" + //d.Tijd.substr(6, 4);
            //var timeStamp = moment(dateString).unix();
            //timeStamp = '"' + timeStamp + '"';
            //timeStamp = timeStamp.replace(':', "test")
            //times.push(timeStamp);
            //stats[d.id] = d.glucose;
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
