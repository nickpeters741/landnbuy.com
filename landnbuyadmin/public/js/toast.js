function snackbar(msg, color) {
    var x = document.getElementById("snackbar");
    $('#snackbar').css('background', color)
    x.innerHTML = msg
    x.className = "show";
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 4000);
}