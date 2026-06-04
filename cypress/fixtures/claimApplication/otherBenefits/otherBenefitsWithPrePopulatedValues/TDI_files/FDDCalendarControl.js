
//******************* SETTING THE POSITION OF CALANDER CONTROL ********************//
function positionInfoFDD(object) {


    //var  p_elm = document.getElementsByName(object);

    var p_elm = object;

    this.getElementLeft = getElementLeft;
    function getElementLeft() {
        var x = 0;
        var elm;
        if (typeof (p_elm) == "object") {
            elm = p_elm;
        } else {
            elm = document.getElementById(p_elm);
        }
        while (elm != null) {
            if (elm.style.position == 'relative') {
                break;
            }
            else {
                x += elm.offsetLeft;
                elm = elm.offsetParent;
            }
        }
        return parseInt(x);
    }
    //******************* END ********************//



    //******************* GETTING THE TEXTBOX CONTROLS DIMENSIONS LIKE WIDTH,TOP ETC. ********************//
    this.getElementWidthFDD = getElementWidthFDD;
    function getElementWidthFDD() {
        var elm;
        if (typeof (p_elm) == "object") {
            elm = p_elm;
        } else {
            elm = document.getElementById(p_elm);
        }
        return parseInt(elm.offsetWidth);
    }

    this.getElementRightFDD = getElementRightFDD;
    function getElementRightFDD() {
        return getElementLeft(p_elm) + getElementWidthFDD(p_elm);
    }

    this.getElementTopFDD = getElementTopFDD;
    function getElementTopFDD() {
        var y = 0;
        var elm;
        if (typeof (p_elm) == "object") {
            elm = p_elm;
        } else {
            elm = document.getElementById(p_elm);
        }
        while (elm != null) {
            if (elm.style.position == 'relative') {
                break;
            }
            else {
                y += elm.offsetTop;
                elm = elm.offsetParent;
            }
        }
        return parseInt(y);
    }

    this.getElementHeightFDD = getElementHeightFDD;
    function getElementHeightFDD() {
        var elm;
        if (typeof (p_elm) == "object") {
            elm = p_elm;
        } else {
            elm = document.getElementById(p_elm);
        }
        return parseInt(elm.offsetHeight);
    }

    this.getElementBottomFDD = getElementBottomFDD;
    function getElementBottomFDD() {
        return getElementTopFDD(p_elm) + getElementHeightFDD(p_elm);
    }
}

//******************* END ********************//


//*********************** DEFINING THE CALANDER CONTROL *************************//
function FDDCalendarControl() {

    var calendarId = 'FDDCalendarControl';
    var currentYear = 0;
    var currentMonth = 0;
    var currentDay = 0;

    var selectedYear = 0;
    var selectedMonth = 0;
    var selectedDay = 0;

    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var dateField = null;

    function getPropertyFDD(p_property) {
        var p_elm = calendarId;
        var elm = null;

        if (typeof (p_elm) == "object") {
            elm = p_elm;
        } else {
            elm = document.getElementById(p_elm);
        }
        if (elm != null) {
            if (elm.style) {
                elm = elm.style;
                if (elm[p_property]) {
                    return elm[p_property];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
    }

    function setElementPropertyFDD(p_property, p_value, p_elmId) {
        var p_elm = p_elmId;
        var elm = null;

        if (typeof (p_elm) == "object") {
            elm = p_elm;
        } else {
            elm = document.getElementById(p_elm);
        }
        if ((elm != null) && (elm.style != null)) {
            elm = elm.style;
            elm[p_property] = p_value;
        }
    }

    function setPropertyFDD(p_property, p_value) {
        setElementPropertyFDD(p_property, p_value, calendarId);
    }

    function getDaysInMonthFDD(year, month) {
        return [31, ((!(year % 4) && ((year % 100) || !(year % 400))) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    }

    function getDayOfWeekFDD(year, month, day) {
        var date = new Date(year, month - 1, day)
        return date.getDay();
    }

    this.clearDate = clearDate;
    function clearDate() {
        document.getElementById(dateField).value = '';
        //dateField.value = '';
        //hideFDD();
    }

   

    this.setDateFDD = setDateFDD;
    function setDateFDD(year, month, day) {
        if (dateField) {
            if (month < 10) { month = "0" + month; }
            if (day < 10) { day = "0" + day; }

            var dateStringFDD = month + "/" + day + "/" + year;
           document.getElementById(dateField).value = dateStringFDD;
           document.getElementById(dateField).focus();
            hideFDD();
        }
        return;
    }


    this.changeMonthFDD = changeMonthFDD;
    function changeMonthFDD(change) {
        var tmpCurrentMonth = currentMonth + change;
        currentDay = 0;
        if (tmpCurrentMonth > 12) {
            if (currentYear >= 2050)
                return;
            currentMonth = 1;
            currentYear++;
        } else if (tmpCurrentMonth < 1) {
            if (currentYear <= 1900)
                return;
            currentMonth = 12;
            currentYear--;
        }
        else
            currentMonth += change;

        calendar = document.getElementById(calendarId);
        calendar.innerHTML = calendarDrawTableFDD();
    }

    this.changeYearFDD = changeYearFDD;
    function changeYearFDD(change) {
        var tmpCurrentYear = currentYear + change;
        if (tmpCurrentYear <= 1901 || tmpCurrentYear >= 2051)
            return;
        currentYear += change;
        currentDay = 0;
        calendar = document.getElementById(calendarId);
        calendar.innerHTML = calendarDrawTableFDD();
    }

    function getCurrentYearFDD() {
        var year = new Date().getYear();
        if (year < 1900) year += 1900;
        return year;
    }

    function getCurrentMonthFDD() {
        return new Date().getMonth() + 1;
    }

    function getCurrentDayFDD() {
        return new Date().getDate();
    }

    function calendarDrawTableFDD() {

        var dayOfMonth = 1;
        var validDay = 0;
        var startDayOfWeek = getDayOfWeekFDD(currentYear, currentMonth, dayOfMonth);
        var daysInMonth = getDaysInMonthFDD(currentYear, currentMonth);
        var css_class = null; //CSS class for each day

        var table = "<table cellspacing='0' cellpadding='0' border='0'>";
        table = table + "<tr class='header'>";
        table = table + "  <td colspan='2' class='previous'><a href='javascript:changeCalendarControlMonthFDD(-1);'>&lt;</a> <a href='javascript:changeCalendarControlYearFDD(-1);'>&laquo;</a></td>";
        table = table + "  <td colspan='3' class='title'>" + months[currentMonth - 1] + "<br>" + currentYear + "</td>";
        table = table + "  <td colspan='2' class='next'><a href='javascript:changeCalendarControlYearFDD(1);'>&raquo;</a> <a href='javascript:changeCalendarControlMonthFDD(1);'>&gt;</a></td>";
        table = table + "</tr>";
        table = table + "<tr><th>S</th><th>M</th><th>T</th><th>W</th><th>T</th><th>F</th><th>S</th></tr>";

        for (var week = 0; week < 6; week++) {
            table = table + "<tr>";
            for (var dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
                if (week == 0 && startDayOfWeek == dayOfWeek) {
                    validDay = 1;
                } else if (validDay == 1 && dayOfMonth > daysInMonth) {
                    validDay = 0;
                }

                if (validDay) {
                    if (dayOfMonth == selectedDay && currentYear == selectedYear && currentMonth == selectedMonth) {
                        css_class = 'current';
                    } else if (dayOfWeek == 0 || dayOfWeek == 6) {
                        css_class = 'weekend';
                    } else {
                        css_class = 'weekday';
                    }

                    table = table + "<td><a class='" + css_class + "' href=\"javascript:setCalendarControlDateFDD(" + currentYear + "," + currentMonth + "," + dayOfMonth + ")\">" + dayOfMonth + "</a></td>";
                    dayOfMonth++;
                } else {
                    table = table + "<td class='empty'>&nbsp;</td>";
                }
            }
            table = table + "</tr>";
        }

        table = table + "<tr class='header'><th colspan='7' style='padding: 3px;'><a href='javascript:clearCalendarControlFDD();'>Clear</a> | <a href='javascript:hideCalendarControlFDD();'>Close</a></td></tr>";
        table = table + "</table>";

        return table;
    }

    this.showFDD = showFDD;
    function showFDD(field, fddyear, fddmonth, fdddate) {
        can_hide = 0;

        // If the calendar is visible and associated with
        // this field do not do anything.
        if (dateField == field) {
            return;
        } else {
            dateField = field;
        }

        if (dateField) {
            try {
                var dateString = new String(dateField.value);
                var dateParts = dateString.split("/");

                selectedMonth = parseInt(dateParts[0], 10);
                selectedDay = parseInt(dateParts[1], 10);
                selectedYear = parseInt(dateParts[2], 10);
            } catch (e) { }
        }

        if (!(selectedYear && selectedMonth && selectedDay)) {
            selectedMonth = fddmonth + 1;
            selectedDay = fdddate;
            if (fddyear < 1900) fddyear += 1900;
            selectedYear = fddyear;
        }

        currentMonth = selectedMonth;
        currentDay = selectedDay;
        currentYear = selectedYear;

        if (document.getElementById) {

            calendar = document.getElementById(calendarId);
            calendar.innerHTML = calendarDrawTableFDD(currentYear, currentMonth);

            setPropertyFDD('display', 'block');

            var fieldPos = new positionInfoFDD(dateField);
            var calendarPos = new positionInfoFDD(calendarId);

            var x = fieldPos.getElementLeft();
            var y = fieldPos.getElementBottomFDD();

            setPropertyFDD('left', x + "px");
            setPropertyFDD('top', y + "px");

            if (document.all) {
                setElementPropertyFDD('display', 'block', 'CalendarControlIFrame');
                setElementPropertyFDD('left', x + "px", 'CalendarControlIFrame');
                setElementPropertyFDD('top', y + "px", 'CalendarControlIFrame');
                setElementPropertyFDD('width', calendarPos.getElementWidthFDD() + "px", 'CalendarControlIFrame');
                setElementPropertyFDD('height', calendarPos.getElementHeightFDD() + "px", 'CalendarControlIFrame');
            }
        }
    }

    this.hideFDD = hideFDD;
    function hideFDD() {
        if (dateField) {
            setPropertyFDD('display', 'none');
            setElementPropertyFDD('display', 'none', 'CalendarControlIFrame');
            dateField = null;
        }
    }

    this.visibleFDD = visibleFDD;
    function visibleFDD() {
        return dateField
    }

    this.can_hide = can_hide;
    var can_hide = 0;
}

var FDDCalendarControl = new FDDCalendarControl();

function showCalendarControlFDD2(textField,fddyear,fddmonth,fdddate) {

    // textField.onblur = hideCalendarControl;
    FDDCalendarControl.showFDD(textField, fddyear, fddmonth, fdddate);
}

function clearCalendarControlFDD() {
    FDDCalendarControl.clearDate();
}

function hideCalendarControlFDD() {
    if (FDDCalendarControl.visibleFDD()) {
        FDDCalendarControl.hideFDD();
    }
}


function setCalendarControlDateFDD(year, month, day) {
    FDDCalendarControl.setDateFDD(year, month, day);

}

function changeCalendarControlYearFDD(change) {
    FDDCalendarControl.changeYearFDD(change);
}

function changeCalendarControlMonthFDD(change) {
    FDDCalendarControl.changeMonthFDD(change);
}





document.write("<iframe id='CalendarControlIFrame' src='javascript:false;' frameBorder='0' scrolling='no'></iframe>");
document.write("<div id='FDDCalendarControl'></div>");
