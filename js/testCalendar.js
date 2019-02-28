var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsLength = [31, 30, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthsLengthLeap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var table = document.getElementById("daysTable");
var today = new Date();
var m = today.getMonth();
var d = today.getDate();
var wd = today.getDay();
var year = today.getFullYear();
var monthInt = m;
var previousStart = 0;
var nextStart = 0;
document.getElementsByClassName("calendarHeader")[0].innerHTML = months[m];
setCellValue(m, calcStartDayCell(d, wd))
document.getElementById("next").onclick = function () {
    if (monthInt == 11) {
        monthInt = 0;
    }
    else monthInt++;
    if (noLeapYear(year)) {
        setCellValue(monthInt, cellNext(previousStart, monthsLength[monthInt-1]));
    }
    if (!noLeapYear(year)) {
        setCellValue(monthInt, cellNext(previousStart,monthsLengthLeap[monthInt-1]));
    }
    var month = months[monthInt];
    document.getElementsByClassName("calendarHeader")[0].innerHTML = month;
}
document.getElementById("back").onclick = function () {
    if (monthInt == 0) monthInt = 11;
    else monthInt--;
    if (noLeapYear(year)) {
        setCellValue(monthInt, cellPast(monthsLength[monthInt+1], previousStart));
    }
    if (!noLeapYear(year)) {
        setCellValue(monthInt, cellPast(monthsLengthLeap[monthInt+1], previousStart));
    }
    var month = months[monthInt];
    document.getElementsByClassName("calendarHeader")[0].innerHTML = month;
}

function setCellValue(monthNr, startDayC) {
    var startDayCell = startDayC;
    var started = false;
    var cellValue = null;
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            if (i != 0) {
                if (noLeapYear(year)) {
                    if (cellValue >= 1 && cellValue <= monthsLength[monthNr]) {
                        cellValue++;
                    }
                    if (cellValue > monthsLength[monthNr]) {
                        cellValue = "";
                    }
                }
                if (!noLeapYear(year)) {
                    if (cellValue >= 1 && cellValue <= monthsLengthLeap[monthNr]) {
                        cellValue++;
                    }
                    if (cellValue > monthsLengthLeap[monthNr]) {
                        cellValue = "";
                    }
                }
                if (j == startDayCell && !started) {
                    cellValue = 1
                    started = true;
                }
                table.rows[i].cells[j].children[0].children[0].innerHTML = cellValue;
            }
        }
    }
    cellValue = "";
}

function calcStartDayCell(dayNr, weekDayNr) {
    
    var startDayCell = weekDayNr;
    for (i = 0; i < dayNr; i++) {
        if (startDayCell > 0) {
            startDayCell--;
        }
        else startDayCell = 6;
    }
    previousStart = startDayCell;
    return startDayCell;
}



function cellPast(vorigeCell, aantalDagenVorigeMaand){
    console.log(aantalDagenVorigeMaand)
    var volgendeStartCell = vorigeCell;
    
    for(i =0; i < aantalDagenVorigeMaand; i++){
        if (volgendeStartCell < 6) {
            volgendeStartCell++;
        }
        else volgendeStartCell = 0;
        console.log(volgendeStartCell)
    }
    previousStart = volgendeStartCell;
    return volgendeStartCell;
}


function cellNext(vorigeCell, aantalDagenVolgendeMaand){
    console.log(aantalDagenVolgendeMaand)
    var volgendeStartCell = vorigeCell;
    
    for(i =0; i < aantalDagenVolgendeMaand; i++){
        if (volgendeStartCell > 0) {
            volgendeStartCell--;
        }
        else volgendeStartCell = 6;
        console.log(volgendeStartCell)
    }
    previousStart = volgendeStartCell;
    return volgendeStartCell;
}


function noLeapYear(year) {
    if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
        return true;
    }
    return false;
}