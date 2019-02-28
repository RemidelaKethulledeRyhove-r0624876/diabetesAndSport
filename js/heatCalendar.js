

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
            //console.log(timeStamp + "whuut");
            times.push(timeStamp);
            //sameDay(timeStamp, d.glucose, times);
            stats[timeStamp] = d.glucose;
            //alert(ts);
        });
        //console.log(stats[1] + "help2");
        //console.log(stats);
        return init(stats);
    })
}

/*
function sameDay(date, glucose, times){
    if (glucose == null){
        return ;
    }
    var da = new Date(date);
    console.log(da+"killl");
    times.forEach(function (d){
        console.log(d+"key")
        //var d1 = new Date(d.)
                  var month = da.getMonth();
                  })
}
*/

