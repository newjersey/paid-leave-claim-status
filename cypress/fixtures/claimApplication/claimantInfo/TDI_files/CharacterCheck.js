$(function () {
    $('HTML').bind('paste', function (e) {
        e = $.extend({}, e, { type: 'afterpaste' });
        window.pastedTest = onPaste(e);
        window.setTimeout(function () {
            $(e.target).trigger(e.type, { data: window.pastedTest })
        }, 0);
    });

    $('input, textarea').bind('paste', validateDABSDataOnPaste);
    $('input, textarea').bind('afterpaste', validateDABSDataAfterPaste);
    $('input, textarea').bind('keypress', validateDABSData);
    $('input, textarea').bind('keyup', validateDABSDataOnKeyUp);
    $('input, textarea').attr("autocomplete", "off");
});


// ************************* function to restrict characters from entering ******************************************************************************//

if (typeof window.combinationChars == 'undefined' || !window.combinationChars) { window.combinationChars = ["&#"]; }
if (typeof window.keyboardCharsListTogether == 'undefined' || !window.keyboardCharsListTogether) { window.keyboardCharsListTogether = ["7&", "3#"]; }

function validateDABSData(e) {
    var regExpDABS = /^[a-zA-Z0-9 \#\%\&\+\:\`\-\;\'\,\.\/]+$/;
    var $targetEle = $(event.currentTarget ? event.currentTarget : event.srcElement);
    if ($targetEle.hasClass("email") || $targetEle.hasClass("freetext")) //regular expression for email is different, allowed @ also - added _
        regExpDABS = /^[a-zA-Z0-9 \@\#\%\&\+\:\`\-\_\;\'\,\.\/]+$/;
    var charCode = e.which || e.keyCode;
    var dataEntered = String.fromCharCode(charCode);

    if (charCode == 13)        //Enter key
        return true;
    else if (!regExpDABS.test(dataEntered))
        return false;
    else
        return true;
}

function validateDABSDataOnPaste(event) {
    var dataPasted = onPaste(event) || "";

    if (isInValidCharactersPasted(dataPasted, event)) {
        alert("Invalid character(s) have been entered.  Please refer to the FAQ’s for additional information on this topic. To continue, select OK."); // Process and handle text...
        return false;
    }
    return true;
}

function validateDABSDataOnKeyUp(event) {
    //Note: Keyup gives which key is pressed not which characters are pressed.
    var charCode = event.which || event.keyCode;
    var charLastEntered = String.fromCharCode(charCode);
    var $dataEntered = $(this).val();

    var dangerItem = getDangerousString($dataEntered);
    if (dangerItem != "") {

        if (charCode != 8 && charCode != 16) { // not backspace and not data link escape
            for (var element = 0; element < keyboardCharsListTogether.length; element++) {
                var keyboardCharTogether = keyboardCharsListTogether[element];
                var keyboardCharNumber = keyboardCharTogether.charAt(0);
                var keyboardCharAlpha = keyboardCharTogether.charAt(1);
                if (charLastEntered.indexOf(keyboardCharNumber) > -1) {
                    var replaceChar = dangerItem.replace(keyboardCharAlpha, "");
                    $(this).val($dataEntered.replace(dangerItem, replaceChar));
                }
            }
        }
        else {  //removes some characters, clicks on delete from backspace
            var newString = removeunwantedPersistentCharacters($dataEntered);
            $(this).val(newString);
        }
    }

    //decimal check
    var $targetEle = $(event.currentTarget ? event.currentTarget : event.srcElement);
    if ($targetEle.hasClass("decimalsonly")) {
        if ($dataEntered == ".") $(this).val("0.");
    }
    return true;
}

function validateDABSDataAfterPaste(event, lastEntered) {
    var currentElementIdent = document.activeElement.id;
    var dataPasted = document.getElementById(currentElementIdent).value;
    var $targetEle = $(event.currentTarget ? event.currentTarget : event.srcElement);

    if ($targetEle.hasClass("email") || $targetEle.hasClass("decimalsonly")) {
        document.getElementById(currentElementIdent).value = removeRepeatedCharacter(dataPasted, $targetEle.attr('class'));
    }

    //testing for illegal combination of characters entered.
    for (var element = 0; element < combinationChars.length; element++) {
        if (dataPasted.search(combinationChars[element]) > -1) {
            alert("Invalid character(s) have been entered.  Please refer to the FAQ’s for additional information on this topic. To continue, select OK.");
            document.getElementById(currentElementIdent).value = removeunwantedPersistentCharacters(dataPasted);
            return false;
        }
    }
    return true;
}

function isDangerousString(str) {
    str = str || "";
    for (var element = 0; element < combinationChars.length; element++) {
        if (str.search(combinationChars[element]) > -1) {
            return true;
        }
    }
    return false;
}

function getDangerousString(str) {
    var dangerItem = "";
    str = str || "";

    for (var element = 0; element < combinationChars.length; element++) {
        if (str.search(combinationChars[element]) > -1) {
            dangerItem = combinationChars[element];
            return dangerItem;
        }
    }
    return dangerItem;
}

function isInValidCharactersPasted(datatoValidate, event) {
    var regExpDABS = /^[a-zA-Z0-9 \#\%\&\+\:\`\-\;\'\,\.\/]+$/;
    var $targetEle = $(event.currentTarget ? event.currentTarget : event.srcElement);
    if ($targetEle.hasClass("email") || $targetEle.hasClass("freetext")) //regular expression for email is different, allowed @ also added _
        regExpDABS = /^[a-zA-Z0-9 \@\#\%\&\+\:\`\-\_\;\'\,\.\/]+$/;
    if ($targetEle.hasClass("numbersonly")) //regular expression for nnumbers only. no dot.
        regExpDABS = /^[0-9]+$/;
    if ($targetEle.hasClass("decimalsonly")) //regular expression for decimals only . allowing one dot and numbers 
        regExpDABS = /^[0-9]*[.]?[0-9]*$/;

    //check if the dataPasted has combination of &# passed.
    if (isDangerousString(datatoValidate))
        return true;

    if (!regExpDABS.test(datatoValidate))
        return true;

    return false;
}

function onPaste(event) {
    var pastedText = undefined;
    if (window.clipboardData && window.clipboardData.getData) { // IE
        pastedText = window.clipboardData.getData('Text');
    } else if (event.originalEvent.clipboardData && event.originalEvent.clipboardData.getData) {
        pastedText = event.originalEvent.clipboardData.getData('text/plain');
    }
    return pastedText;
}


function removeunwantedPersistentCharacters(newString) {
    var newStringFormed = false;
    var modifiedString = newString;
    for (var element = 0; element < combinationChars.length; element++) {

        var dangerItem = combinationChars[element];
        var firstChar = dangerItem.charAt(0);
        var secondChar = dangerItem.charAt(1);
        var search = new RegExp(firstChar + "[" + secondChar + "]+", 'gi');
        var result = newString.match(search);
        if (result != null) {
            var replaceChar = dangerItem.replace(dangerItem.charAt(1), "");
            modifiedString = newString.replace(result, replaceChar);
        }
    }
    return modifiedString;
}

function removeRepeatedCharacter(targetString, charDetermination) {
    var regExpDABS = "";
    var searchChar = "";
    var strReplace = targetString;

    if (charDetermination === "decimalsonly") {    //after paste testing if more than one dot is entered.
        regExpDABS = /^[0-9]*[.]?[0-9]*$/;
        searchChar = ".";
        if (!regExpDABS.test(targetString)) {
            alert("Invalid character(s) have been entered.  Please refer to the FAQ’s for additional information on this topic. To continue, select OK.");
            var ipos = targetString.lastIndexOf(searchChar);
            if (ipos != -1)
                strReplace = targetString.substr(0, ipos) + targetString.substr(ipos + 1);
        }
        if (targetString == ".") strReplace = "0.0";
    }

    if (charDetermination === "email") { //after paste testing if more than one @ is entered.
        regExpDABS = /@/g;
        searchChar = "@";
        if ((targetString.match(/@/g) || "").length > 1) {
            alert("Invalid character(s) have been entered.  Please refer to the FAQ’s for additional information on this topic. To continue, select OK.");
            var ipos = targetString.lastIndexOf(searchChar);
            if (ipos != -1)
                strReplace = targetString.substr(0, ipos) + targetString.substr(ipos + 1);
        }
    }
    return strReplace;
}

