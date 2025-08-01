//Added by Avinash
function SessionExpireAlert(timeout, parameter) {
    var seconds = timeout / 1000;
   
    document.getElementsByName("seconds").innerHTML = Math.ceil(seconds / 60);
    setInterval(function () {
        seconds--;

        $get("seconds").innerHTML = Math.ceil(seconds / 60);
       
    }, 1000);
    setTimeout(function () {
        //Show Popup before 300 seconds(5 min) of timeout.
        $find("mpeTimeout").show();
    }, timeout - 300 * 1000);
    setTimeout(function () {

        window.location = "SessionExpired.aspx?Timeout=" + parameter;
    }, timeout);
};
function ResetSession() {
    //Redirect to refresh Session.
    // window.location = window.location.href;
    window.location.reload();
}

function RedirectSession(parameter) {
    //Redirect to  Session.
    window.location = "SessionExpired.aspx?Timeout=" + parameter;
}