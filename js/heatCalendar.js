function init(stats) {
    //console.log(Object.values(stats) + "help");
    //var whut = JSON.stringify(stats);
    //console.log(whut+ "help3");
    var cal = new CalHeatMap();
    cal.init({

        id: "#cal-heatmap",
        itemNamespace: "cal",
        data: stats,
        dataType: "txt",
        domain: "month",
        start: new Date(2019, 0, 1),
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
            console.log(nb + "nb");
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
setData();

function dayData(date, stats, cal2) {
    console.log(date),
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
    closeButton.addEventListener("click", function(){
        closeGraph(closeButton.id);
    })
}

function closeGraph(id) {
    var toRemove1 = document.getElementById("container"+id);
    var toRemove2 = document.getElementById(id);
    toRemove1.parentNode.removeChild(toRemove1);
    toRemove2.parentNode.removeChild(toRemove2);
}

function setData() {
    var stats = {};
    var times = [];

    //d3.json("datafiles/dummyData.json", function (data) {
    d3.json("datafiles/bgDatabase.json", function (data) {
        var date;
        data.forEach(function (d) {
            //console.log(d.Tijd + "test");
            //d.Tijd += ":00";
            //d.glucose = d["Historie glucose (mg/dL)"];
            d.glucose = +d.bg;
            d.id = +d.id;
            console.log(d.id + "hello");
            //console.log(d.glucose + "test2");
            //if (d.Tijd.substring(0, 2).includes("/")) {
            //    d.Tijd = "0" + d.Tijd;
            //}
            //var dateString = d.Tijd.substr(3, 2) + "/" + d.Tijd.substr(0, 2) + "/" + //d.Tijd.substr(6, 4);
            //console.log(dateString + "hello");
            //var timeStamp = moment(dateString).unix();
            //timeStamp = '"' + timeStamp + '"';
            //timeStamp = timeStamp.replace(':', "test")
            //console.log(Object.keys(stats) + "whuut");
            //times.push(timeStamp);
            //console.log(times+"helllloooo");
            stats[d.id] = d.glucose;
            console.log(d.id);
            console.log(getdhm(d.id));
            //stats.map(groupday);
            //stats.map(groupday);
            //alert(ts);
        });
        //console.log(stats[1] + "help2");
        console.log(stats);
        return init(stats);
    })
}

function getdhm(timestamp) {
    var timestam = timestamp * 1000;
    console.log(timestam);
    var date = new Date(timestam);
    console.log(date);
    var month = date.getMonth();
    var day = date.getDay();
    var year = date.getYear();

    var formattedTime = month + '/' + day + '/' + year;
    return formattedTime;
}