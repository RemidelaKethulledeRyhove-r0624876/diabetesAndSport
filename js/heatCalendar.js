

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
        start: new Date(2018, 9, 1),
        cellSize: 20,
        legendCellSize: 20,
        itemName: ["glucose"],
        legend: [100, 200],
        colLimit: 31,
        verticalOrientation: true,
        onClick: function(stats) {
            
		console.log("test");
	},
        label: {
            position: "left",
        },
    });
}
setData();

function setData() {
    var stats = {};
    var times= [];

    d3.json("datafiles/dummyData.json", function (data) {
        var date;
        data.forEach(function (d) {
            //console.log(d.Tijd + "test");
            d.Tijd += ":00";
            d.glucose = d["Historie glucose (mg/dL)"];
            //console.log(d.glucose + "test2");
            if (d.Tijd.substring(0, 2).includes("/")) {
                d.Tijd = "0" + d.Tijd;
            }
            var dateString = d.Tijd.substr(3, 2) + "/" + d.Tijd.substr(0, 2) + "/" + d.Tijd.substr(6, 4);
            //console.log(dateString + "hello");
            var timeStamp = moment(dateString).unix();
            //timeStamp = '"' + timeStamp + '"';
            //timeStamp = timeStamp.replace(':', "test")
            console.log(Object.keys(stats) + "whuut");
            times.push(timeStamp);
            console.log(times+"helllloooo");
            stats[timeStamp] = d.glucose;
            //stats.map(groupday);
            //stats.map(groupday);
            //alert(ts);
        });
        //console.log(stats[1] + "help2");
        //console.log(stats);
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
