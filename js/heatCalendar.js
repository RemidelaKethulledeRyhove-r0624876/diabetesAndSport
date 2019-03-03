function init(stats, times, startdate) {
    cal = new CalHeatMap();
    cal.init({

        id: "#cal-heatmap",
        itemNamespace: "cal",
        data: times,
        dataType: "txt",
        domain: "month",
        start: startdate,
        subDomainTextFormat: "%d",
        cellSize: 20,
        legendCellSize: 20,
        itemName: ["glucose"],
        legend: [100, 200],
        colLimit: 66,
        domainDynamicDimension: false,
        range: 12,
        verticalOrientation: true,
        onClick: function (date, nb) {
            var cal2 = new CalHeatMap();
            dayData(date, stats, cal2);
        },
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
var cal = null;

function destroyCalender() {
    cal.destroy();
}
setData();

function dayData(date, stats, cal2) {
    cal2.init({
        id: "#cal-heatmap",
        data: stats,
        itemNamespace: "cal2",
        dataType: "txt",
        domain: "day",
        start: new Date(date),
        cellSize: 20,
        legendCellSize: 20,
        itemName: ["glucose"],
        legend: [100, 200],
        colLimit: 66,
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

    var calendarcontainers = document.getElementsByClassName("cal-heatmap-container");
    var heatmapContainer = document.getElementById("cal-heatmap");
    var closeButton = document.createElement("button");
    closeButton.classList.add("closeButton");
    closeButton.style.border = null;
    closeButton.innerHTML = "Close Chart";

    heatmapContainer.appendChild(closeButton);
    var closeButtons = document.getElementsByClassName("closeButton");
    for (i = 0; i < calendarcontainers.length; i++) {
        calendarcontainers[i].id = "container" + i;
        if (i != 0) {
            closeButtons[i - 1].id = i;
        }
    }
    closeButton.addEventListener("click", function () {
        closeGraph(closeButton.id);
    })
}

function closeGraph(id) {
    var toRemove1 = document.getElementById("container" + id);
    var toRemove2 = document.getElementById(id);
    toRemove1.parentNode.removeChild(toRemove1);
    toRemove2.parentNode.removeChild(toRemove2);
}

function setData(startdate) {
    var stats = {};
    var times = {};
    var numberofTimes = {};
    var firsttime = true;
    var numbers = 1;
    var first = 0;
    if (startdate == null) {
        console.log("testg");
        startdate = new Date(2019, 0, 1);
    }
    console.log(startdate + "fe");

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
            stats[d.id] = d.glucose;
            if (firsttime == true) {
                times[d.id] = d.glucose;
                numberofTimes[getdhm(d.id)] = numbers;
                firsttime = false;
                first = d.id;
            }
            var equalItem = false;
            Object.keys(times).forEach(function (item) {
                if (getdhm(item) == getdhm(d.id) && first != d.id) {
                    equalItem = true;
                    times[item] += d.glucose;
                    numberofTimes[getdhm(d.id)] += 1;
                }
            });
            if (equalItem == false && first != d.id) {
                times[d.id] = d.glucose;
                numberofTimes[getdhm(d.id)] = numbers;
            }
        });
        Object.keys(times).forEach(function (item) {
            times[item] = times[item] / numberofTimes[getdhm(item)];
        })
        return init(stats, times, startdate);
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
