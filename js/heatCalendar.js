var cal = new CalHeatMap();
	cal.init({  
        id: "#cal-heatmap",
        data: "datafiles/dummyData.json",
        domain : "day",
		subDomain : "hour",
        range: 14,
        cellSize: 20,
        legendCellSize: 20,
        itemName: ["insuline"],
        legend: [100, 200]
    });