//Declaring variables with the namespace scope
if (typeof window.TDI == 'undefined' || !window.TDI) {
    window.TDI = {};
}
TDI.NJStateCode = "34";
TDI.InvalidDateMessage = "Please enter the date in MM/DD/YYYY format.";
TDI.InvalidToDateMessage = "To Date cannot be after today's date.";
TDI.InvalidEndDate = "End date should be greater than start date.";
TDI.OOC = "Out of Country";
TDI.USA = "USA";
TDI.Blank = "Blank";
TDI.FLISource = "FLI";
TDI.TDISource = "TDI";
TDI.StartDateMessage = "Start date";
TDI.EndDateMessage = "End date";
TDI.DefaultDateStr = "01/01/1900";     //Defect3 1056
TDI.DefaultStateNJ = "NJ";

function keyCheck(event) {
    keynum = window.event ? window.event.keyCode : event.which;

    if (keynum == 8) {
        if (window.event) {
            if ((window.event.srcElement.type != "text" && window.event.srcElement.type != "textarea" && window.event.srcElement.type != "password") || (window.event.srcElement.readOnly)) {
                window.event.returnValue = false;
                window.event.cancelBubble = true;
                return false;
            }
        }
        else {
            if ((event.target.type != "textarea" && event.target.type != "text" && event.target.type != "password") || (event.target.readOnly)) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        }
    }
    return true;
}

function StartEndValidation(txtStart, txtEnd, val) {
    var startdate;
    var enddate;

    if (val == "start" && txtStart.value != "") {
        if (txtStart.value.length < 10) {
            alert(TDI.InvalidDateMessage);
            txtStart.focus();
            txtStart.value = "";
            return false;
        }
        else if (txtStart.value.length == 10) {
            if (OnDateChange(txtStart) == false) {
                return false;
            }
            else {
                startdate = new Date(txtStart.value);

                if (NoFutureDate(txtStart, TDI.StartDateMessage) == false) {
                    return false;
                }

                if (document.getElementById(txtEnd).value != "") {
                    enddate = new Date(document.getElementById(txtEnd).value);
                    if (enddate < startdate) {
                        alert(TDI.InvalidEndDate);
                        document.getElementById(txtEnd).value = "";
                        document.getElementById(txtEnd).focus();
                        return false; 
                    }
                }
            }
        }
    }
    else if (val == "end" && txtEnd.value != "") {
        if (txtEnd.value.length < 10) {
            alert(TDI.InvalidDateMessage);
            txtEnd.focus();
            txtEnd.value = "";
            return false;
        }
        else if (txtEnd.value.length == 10) {
            if (OnDateChange(txtEnd) == false) {
                return false;
            }
            else {
                if (document.getElementById(txtStart).value != "") {
                    startdate = new Date(document.getElementById(txtStart).value);
                }
                if (txtEnd.value != "") {
                    enddate = new Date(txtEnd.value); 
                }
                if (NoFutureDate(txtEnd, TDI.EndDateMessage) == false) {
                    return false;
                }
                if (enddate < startdate) {
                    alert(TDI.InvalidEndDate);
                    txtEnd.value = "";
                    txtEnd.focus();
                    return false; 
                }
            }
        }
    }
}

function onlyNumbers(e) {
    var evt = e ? e : window.event;
    var chCode = e.which || e.keyCode || e.charCode;
    if (chCode > 31 && (chCode < 48 || chCode > 57)) {
        evt.returnValue = false;
        evt.cancelBubble = true;  // Stop event from bubbling to the DOM.
        return false;
    }

    return true;
}
function DecimalNumbers(e) {

    var evt = e ? e : window.event;
    var chCode = e.which || e.keyCode || e.charCode;
    
    if (chCode >= 48 && chCode <= 57 ||
                 chCode == 46) {
        return true;
    }
    else {
        evt.returnValue = false;
        evt.cancelBubble = true;
        return false;
    }

}
function OnDateChange(textbox) {

    if (textbox != undefined) {

    //Added
        var CompareDate = new Date(textbox.value);
        var CompareDate1 = new Date(CompareDate.getFullYear(), CompareDate.getMonth(), CompareDate.getDate());
        var today = new Date();
        var today1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        var datecheck = textbox.value;
        if (textbox.value != "" && textbox.value.length > 9) {

            var valid = true;
            var i = 0;
            for (i = 0; i <= textbox.value.length - 1; i++) {
                var charCode = textbox.value.charCodeAt(i);
                if ((charCode < 48 && charCode != 47) || charCode > 90) 
                {

                    alert(TDI.InvalidDateMessage); textbox.focus(); textbox.value = ""; return false;
                }
                //Added
                if (today.getFullYear() - CompareDate.getFullYear() > 150) {
                    alert("Date should not precede more than 150 years");
                    textbox.focus();
                    textbox.value = "";
                    return false;
                }
        }

            var charcyr1 = parseInt(datecheck.substring(6, 8), 10);
            if (charcyr1 == 00 || charcyr1 == 0) { valid = false; }

            if (isNaN(datecheck.substring(0, 2))) { valid = false; }
            else if (isNaN(datecheck.substring(3, 5))) { valid = false; }
            else if (isNaN(datecheck.substring(6, 10))) { valid = false; }

            if (valid == true) {
                var charcMM = parseInt(datecheck.substring(0, 2), 10);
                var charec = datecheck.substring(2, 3);
                var charcDD = parseInt(datecheck.substring(3, 5), 10);
                var charec2 = datecheck.substring(5, 6);
                var charcyr = parseInt(datecheck.substring(6, 10), 10);
                var charcyr1 = parseInt(datecheck.substring(6, 8), 10);

                if (charec != "/" || charec2 != "/") { valid = false; }
                else if (isNaN(charcMM) == true) { valid = false; }
                else if (charcMM < 1 || charcMM > 12) { valid = false; }
                else if (isNaN(charcDD) == true) { valid = false; }
                else if (charcDD < 1 || charcDD > 31) { valid = false; }
                else if (isNaN(charcyr) == true) { valid = false; }
                else if ((charcMM == 4 || charcMM == 6 || charcMM == 9 || charcMM == 11) && (charcDD > 30)) { valid = false; }
                else if (charcyr % 4 == 0 && charcyr % 100 != 0) { if (charcMM == 2 && charcDD > 29) { valid = false; } }
                else if (charcyr % 4 == 0 && charcyr % 100 == 0 && charcyr % 400 == 0) { if (charcMM == 2 && charcDD > 29) { valid = false; } }
                else if (charcMM == 2 && charcDD > 28) { valid = false; }
                else if (charcyr1 == 00 || charcyr1 == 00) { valid = false; }
            }

            if (valid == false) 
            {
                alert(TDI.InvalidDateMessage); 
            textbox.focus(); textbox.value = ""; return false; }

        }

    }
}

function totestYear(textbox) {
    if (textbox.value != "" && textbox.value.length < 10) { alert(TDI.InvalidDateMessage); textbox.focus(); textbox.value = ""; return false; }
    else if (textbox.value.length == 10) {
        var ToDate = new Date(textbox.value);
        var year = ToDate.getFullYear();
        if (year > 2099) {
            alert("You have not entered a valid date.  Please enter a valid date.");
            textbox.focus();
            textbox.value = "";
            return false;
        }
    }
}
function mousecopy(e, textbox, len) 
{
    var datatext = window.clipboardData.getData('Text');
    if (datatext.length >= len) { textbox.value = datatext.substring(0, len - 1); return false; }
    else { textbox.value = datatext; }
}

function AlphaNumeric(e) 
{
    var charCode = e.which || e.keyCode;
    if (/[^A-Za-z0-9]/.test(String.fromCharCode(charCode)))
        return false;
    else
        return true;
}

function NoFutureDate(textbox, msg) {
    if (textbox.value != "" && textbox.value.length < 10) {
        alert(TDI.InvalidDateMessage);
        textbox.focus();
        textbox.value = "";
        return false;
    }
    else if (textbox.value.length == 10) {
        var CompareDate = new Date(textbox.value);
        var CompareDate1 = new Date(CompareDate.getFullYear(), CompareDate.getMonth(), CompareDate.getDate());
        var today = new Date();
        var today1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        if (CompareDate1.valueOf() > today1.valueOf()) {
            alert(msg + " cannot be after today’s date.");
            textbox.focus();
            textbox.value = "";
            return false;
        }
    }
}

function AllowFutureDate(textbox, msg) {
    if (textbox.value != "" && textbox.value.length < 10) {
        alert(TDI.InvalidDateMessage);
        textbox.focus();
        textbox.value = "";
        return false;
    }
    else if (textbox.value.length == 10) {
        var CompareDate = new Date(textbox.value);
        var CompareDate1 = new Date(CompareDate.getFullYear(), CompareDate.getMonth(), CompareDate.getDate());
        var today = new Date();
        var today1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var year = CompareDate.getFullYear();

        if (CompareDate1.valueOf() == today1.valueOf()) {
            alert(msg + " cannot be today’s date.");
            textbox.focus();
            textbox.value = "";

            return false;
        }
        else if (CompareDate1.valueOf() < today1.valueOf()) {
            alert(msg + " cannot be before today’s date.");
            textbox.focus();
            textbox.value = "";

            return false;
        }
        else if (year < 2000 || year > 2099) {
            alert("You have not entered a valid date.  Please enter a valid date.");
            textbox.focus();
            textbox.value = "";
            return false;
        }        

    }
}

function autoTab(input, len, e) {

    if (input.value.length >= len) {
        input.value = input.value.slice(0, len);
        input.form[(getIndex(input) + 1) % input.form.length].focus();
    }
    function getIndex(input) {
        var index = -1, i = 0, found = false;
        while (i < input.form.length && index == -1)
            if (input.form[i] == input) index = i;
            else i++;
        return index;
    }
    return true;
}

function getCountofEnterKeyLimit(count_of_rows) {
    switch (count_of_rows) {
        case 300:
            return 4;
        case 125:
        case 200:
        case 100:
            return 2;
    }
    return 2;
}

function check_length(textAreaId, countId, maxNum, hdnField) {
    var obj = $get(countId);
    var textArea = textAreaId.value;
    var maxSize = maxNum;
    var reRlNL = /\n/g;
    var reCRNL = /\r\n/g;

    if (reRlNL.test(textArea) && !reCRNL.test(textArea)) { //IE9 and higher
        textArea = textArea.replace(/\n/g, '\r\n');
    }

    if (textArea.match(reCRNL) != null) {
        if (textArea.match(reCRNL).length > getCountofEnterKeyLimit(maxNum)) {       //Enter key
            textArea = textArea.substring(0, textArea.length - 2);
            textAreaId.value = textArea;
        }
    }

    var taLN = textArea.length;
    if (taLN > maxSize) {
        var modTxtArea = textArea;
        textAreaId.value = TrimBrwserCompatability(modTxtArea.substring(0, maxSize)); //IE8
        taLN = maxSize;
    }
    var ln = maxSize - taLN;
    obj.value = ln;
}


function TrimBrwserCompatability(x) {
    return x.replace(/^\s+|\s+$/g, '');
}

function limitTextarea(el, maxLines, maxChar) {
    if (el.value == "") return;
    var alert_title = 'Input Restriction';
    if (!el.x) {
        el.x = uniqueInt();
        el.onblur = function () { clearInterval(window['int' + el.x]) }
    }
    window['int' + el.x] = setInterval(function () {
        var lines = el.value.replace(/\r/g, '').split('\n'),
        i = lines.length,
        lines_removed,
        char_removed;
        if (maxLines && i > maxLines) {
            //alert('You can not enter\nmore than ' + maxLines + ' lines');
            lines = lines.slice(0, maxLines);
            lines_removed = 1
        }
        if (maxChar) {
            i = lines.length;
            while (i-- > 0) if (lines[i].length > maxChar) {
                lines[i] = lines[i].slice(0, maxChar);
                char_removed = 1
            }
            if (char_removed) {
                //alert('You can not enter more\nthan ' + maxChar + ' characters per line') 
            }
        }
        if (char_removed || lines_removed)
            el.value = lines.join('\n')
    }, 50);
}

function uniqueInt() {
    var num, maxNum = 100000;
    if (!uniqueInt.a || maxNum <= uniqueInt.a.length) uniqueInt.a = [];
    do num = Math.ceil(Math.random() * maxNum);
    while (uniqueInt.a.hasMember(num))
    uniqueInt.a[uniqueInt.a.length] = num;
    return num
}

Array.prototype.hasMember = function (testItem) {
    var i = this.length;
    while (i-- > 0) if (testItem == this[i]) return 1;
    return 0
};

function WireAutoTab(CurrentElementID, NextElementID, FieldLength) {
    //Get a reference to the two elements in the tab sequence.
    var CurrentElement = $('#' + CurrentElementID);
    var NextElement = $('#' + NextElementID);

    CurrentElement.keyup(function (e) {
        //Retrieve which key was pressed.
        var KeyID = (window.event) ? event.keyCode : e.keyCode;

        if (CurrentElement.val().length >= FieldLength
            && ((KeyID >= 48 && KeyID <= 90) ||
            (KeyID >= 96 && KeyID <= 105)))
            NextElement.focus();
    });
}

function moveCursor(curr_control, foc_control) {
    var obj = eval("document.getElementById('" + foc_control + "')");
    var objCC = eval("document.getElementById('" + curr_control + "')");
    var objCCVal = objCC.value;
    if (obj != null) {
        objCC.value = "";
        objCC.value = objCCVal;
        obj.focus();
        return false;
    }
}

function StartEndDateValidation(txtStart, txtEnd, val, msg) {
    var startdate; var enddate;
    var newmsg = msg.replace("start", "end");
    
    if (val == "start") {
        if (txtStart.value != "" && txtStart.value.length < 10) { alert(TDI.InvalidDateMessage); txtStart.focus(); txtStart.value = ""; return false; }        
        else if (txtStart.value != "") {
            startdate = new Date(txtStart.value);
            if (document.getElementById(txtEnd).value != "") {
                enddate = new Date(document.getElementById(txtEnd).value);
                if (enddate < startdate) { alert(newmsg + " should be on or after " + txtStart.value); document.getElementById(txtEnd).value = ""; document.getElementById(txtEnd).focus(); return false; }
            }
        }
    }
    else if (val == "end") {        
        if (txtEnd.value != "" && txtEnd.value.length < 10) { alert(TDI.InvalidDateMessage); txtEnd.focus(); txtEnd.value = ""; return false; }        
        if (document.getElementById(txtStart).value != "") { startdate = new Date(document.getElementById(txtStart).value); } if (txtEnd.value != "") { enddate = new Date(txtEnd.value); }
        if (enddate < startdate) { alert(newmsg + " should be on or after " + $get(txtStart).value); txtEnd.value = ""; txtEnd.focus(); return false; }
    }
}

function hideCalendarInPage() {
    $("*").focus(function () { hideCalendarControl(); hideCalendarControlFDD(); });
}

function confirmLogout(suppressMessage) {
    if (suppressMessage && suppressMessage === "yes") return;
    var action = confirm("If you logout before reaching the Confirmation Page, there may be unsaved data. If you want to continue to logout click OK.");
    return action;
}

function isTextHighLighted(evt) {
    var elemnt = evt.srcElement;
    if (typeof elemnt.selectionStart == "number") { // for browsers other than IE
        return (elemnt.selectionStart == 0 && elemnt.selectionEnd == elemnt.value.length);
    }
    else if (typeof document.selection != "undefined") { // for IE browsers  
        elemnt.focus();
        return (document.selection.createRange().text == elemnt.value);
    }
}

//function to check if the day of the month is other than the first day..
function validateDayinDate(textbox) {
    
    if(totestYear(textbox) == false){
      return false;
    }

    if(OnDateChange(textbox) == false){
      return false;
    } 

    if (textbox.value != "") {
        var dtEntered = new Date(textbox.value);        
        if (dtEntered.getDate() != "1") {
            if (textbox.id == "ContentPlaceHolder1_ClaimantDisabilityTab_TabBenefits_txtSSDate") {
                alert("The Social Security Disability start date must always be the first day of the month MM/01/YYYY.");
            } else {
                //since this is the generic fn we can change the message we want specific to the id of the textbox.
                alert("The date must always be the first day of the month MM/01/YYYY.");
            } 
            textbox.focus();
            textbox.value = "";
            return false;
        }        
    }
}

function letternumber(e) {
    var charCode = e.which || e.keyCode;
    if (/[^A-Za-z0-9]/.test(String.fromCharCode(charCode)))
        return false;
    else
        return true;
}

function callCalendar(textbox, txtDefault) {
    var dateFDDtest;

    if (document.getElementById(txtDefault).value == "")
        dateFDDtest = new Date();
    else
        dateFDDtest = new Date(document.getElementById(txtDefault).value);

    showCalendarControlFDD2(textbox, dateFDDtest.getFullYear(), dateFDDtest.getMonth(), dateFDDtest.getDate());
}

var newwindow = null;
function openFAQWindow(faqPath) {
    if ((newwindow == null) || (newwindow.closed)) {
        newwindow = window.open(faqPath, 'faqWin', 'height=600,scrollbars=yes,resizable=yes');
        newwindow.focus();
    } else {
        newwindow.location.href = faqPath;
        newwindow.focus();
    }
    
    //window.open(faqPath);
    return false;
}
