var cal = new CalHeatMap();
	cal.init({  
        id: "#cal-heatmap",
        data: "datafiles/dummyData.json",
        domain : "month",
		subDomain : "day",
        cellSize: 20,
        legendCellSize: 20,
        itemName: ["insuline"],
        legend: [100, 200],
        colLimit: 31,
        verticalOrientation: true,
        label: {
		position: "left",
	}
    });

d3.json("datafiles/dummyData.json", function (data) {
    var date;
             data.forEach(function (d) {
                 console.log(d.Tijd + "test");
                 d.Tijd += ":00";
                 console.log(d.Tijd + "test3");
                 var date = Math.round(new Date(d.Tijd).getTime()/1000)
                 console.log(date+"whuut");
                 d.glucose = d["Historie glucose (mg/dL)"];
                 console.log(d.glucose + "test2");
             });
         })