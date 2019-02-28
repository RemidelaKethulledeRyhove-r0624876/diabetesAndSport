

function init(stats) {
    //console.log(Object.values(stats) + "help");
    //var whut = JSON.stringify(stats);
    //console.log(whut+ "help3");
    var cal = new CalHeatMap();
    cal.init({
        
        id: "#cal-heatmap",
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
        onClick: function(date, nb) {
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

function dayData(date,stats, cal2){
    console.log(date),
              cal2.init({
        id: "#cal-heatmap",
        data: stats,
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
            
		console.log("test");
	}

function setData() {
    var stats = {};
    var times= [];

    //d3.json("datafiles/dummyData.json", function (data) {
    d3.json("datafiles/bgDatabase.json", function (data) {
        var date;
        data.forEach(function (d) {
            //console.log(d.Tijd + "test");
            //d.Tijd += ":00";
            //d.glucose = d["Historie glucose (mg/dL)"];
            d.glucose = +d.bg;
            d.id = +d.id;
            console.log(d.id+"hello");
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
            //stats.map(groupday);
            //stats.map(groupday);
            //alert(ts);
        });
        //console.log(stats[1] + "help2");
        console.log(stats);
        return init(stats);
    })
}

var byday={};

function groupday(value, index, array)
{
    console.log("test");
    var d = new Date(value['date']);
    d = Math.floor(d.getTime()/(1000*60*60*24));
    byday[d]=byday[d]||[];
    byday[d].push(value);
}
