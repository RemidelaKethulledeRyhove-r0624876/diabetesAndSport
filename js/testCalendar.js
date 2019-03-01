var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthsLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthsLengthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var table = document.getElementById("daysTable");
var today = new Date();
var m = today.getMonth();
var d = today.getDate();
var wd = today.getDay();
var year = today.getFullYear();
var monthInt = m;
var previousStart = 0;
var nextStart = 0;
var backPressed = false;
var frontPressed = false;
document.getElementsByClassName("calendarHeader")[0].innerHTML = months[m];
setCellValue(m, calcStartDayCell(d, wd))
document.getElementById("next").onclick = function () {
    frontPressed = true;
    if (monthInt == 11) {
        monthInt = 0;
    }
    else monthInt++;
    if (!leapYear(year)) {
        setCellValue(monthInt, cellNext(previousStart, monthsLength[monthInt-1]));
    }
    if (leapYear(year)) {
        setCellValue(monthInt, cellNext(previousStart,monthsLengthLeap[monthInt-1]));
    }
    var month = months[monthInt];
    document.getElementsByClassName("calendarHeader")[0].innerHTML = month;
    backPressed = false;
}
document.getElementById("back").onclick = function () {
    backPressed = true;
    if (monthInt == 0) monthInt = 11;
    else monthInt--;
    if (!leapYear(year)) {
        setCellValue(monthInt, cellNext(previousStart, monthsLength[monthInt]));
    }
    if (leapYear(year)) {
        console.log(monthsLengthLeap[monthInt])
        setCellValue(monthInt, cellNext(previousStart, monthsLengthLeap[monthInt]));
    }
    var month = months[monthInt];
    document.getElementsByClassName("calendarHeader")[0].innerHTML = month;
    frontPressed = false;
}

function setCellValue(monthNr, startDayC) {
    var startDayCell = startDayC;
    previousStart = startDayCell;
    var started = false;
    var cellValue = null;
    for (i = 0; i < 7; i++) {
        for (j = 0; j < 7; j++) {
            if (i != 0) {
                if (!leapYear(year)) {
                    if (cellValue >= 1 && cellValue <= monthsLength[monthNr]) {
                        cellValue++;
                    }
                    if (cellValue > monthsLength[monthNr]) {
                        cellValue = "";
                    }
                }
                if (leapYear(year)) {
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
    
    for(i = 0; i < aantalDagenVorigeMaand; i++){
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
    var volgendeStartCell = null;
    if(backPressed && frontPressed) {
        volgendeStartCell = vorigeCell-1
    } else {
        volgendeStartCell = vorigeCell;
    }
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


function leapYear(yr) {return !((yr % 4) || (!(yr % 100) && (yr % 400)));};