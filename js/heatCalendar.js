function init(stats, times) {
    //console.log(Object.values(stats) + "help");
    //var whut = JSON.stringify(stats);
    //console.log(whut+ "help3");
    var cal = new CalHeatMap();
    cal.init({

        id: "#cal-heatmap",
        itemNamespace: "cal",
        data: times,
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

    //console.log("test");
}

function setData() {
    var stats = {};
    var times = {};
    var numberofTimes= {};
    var firsttime = true;
    var numbers = 1;
    var first = 0;

    //d3.json("datafiles/dummyData.json", function (data) {
    d3.json("datafiles/bgDatabase.json", function (data) {
        var date;
        data.forEach(function (d) {
            //console.log(d.Tijd + "test");
            //d.Tijd += ":00";
            //d.glucose = d["Historie glucose (mg/dL)"];
            d.glucose = +d.bg;
            d.id = +d.id;
            //console.log(d.id + "hello");
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
            //console.log(d.id);
            //console.log(getdhm(d.id) + "dh");
            if(firsttime == true){
                times[d.id] = d.glucose;
                numberofTimes[getdhm(d.id)] = numbers;
                console.log("trueeee");
                firsttime = false;
                first = d.id;
            }
            var equalItem = false;
            Object.keys(times).forEach(function (item) {
                if(getdhm(item) == getdhm(d.id) && first != d.id){
                    //console.log("gelijktest");
                    console.log(getdhm(item)+"itemtest");
                    //console.log(getdhm(d.id)+"idtest");
                    equalItem = true;
                    times[item] += d.glucose;
                    //console.log(numberofTimes[getdhm(d.id)]+"values");
                    numberofTimes[getdhm(d.id)] += 1;
                    console.log(numberofTimes[getdhm(d.id)]+"values2");
                }
                //console.log(item+"item"); // timestamp
            });
            if(equalItem == false && first != d.id){
                    console.log("voegtoe");
                    times[d.id] = d.glucose;
                    numberofTimes[getdhm(d.id)] = numbers;
                }
            //stats.map(groupday);
            //stats.map(groupday);
            //alert(ts);
            //console.log(times);
        });
        Object.keys(times).forEach(function (item) {
            times[item] = times[item]/ numberofTimes[getdhm(item)];
        })
        return init(stats, times);
    })
}

function getdhm(timestamp) {
    var timestam = timestamp * 1000;
    //console.log(timestam);
    var date = new Date(timestam);
    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();

    var formattedTime = month + '/' + day + '/' + year;
    return formattedTime;
}
