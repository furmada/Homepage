//! timebeacon.js
//! version : 1.0.1
//! author : Martin Gillow
currentScreen = "";

function toggleFullScreen() {
    document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? document.exitFullscreen ? document.exitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen() : document.documentElement.requestFullscreen ? document.documentElement.requestFullscreen() : document.documentElement.msRequestFullscreen ? document.documentElement.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullscreen && document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
}

function toggleScreen(name) {
    if (currentScreen != "") {
        $("#" + currentScreen).hide().removeClass("showscreen");
        if (currentScreen == name) {
            $("#stardate").fadeIn("slow").addClass("showscreen");
            currentScreen = "";
            return;
        }
    }
    currentScreen = name;
    $("#stardate").hide().removeClass("showscreen");
    $("#" + name).fadeIn("slow").addClass("showscreen");
}

function toggleInfo() {
    $("#timeinfo").hasClass("showscreen") ? ($("#timeinfo").hide().removeClass("showscreen"), $("#stardate").fadeIn("slow").addClass("showscreen")) : ($("#stardate").hide().removeClass("showscreen"), $("#timeinfo").fadeIn("slow").addClass("showscreen"))
}

function togglePreferencias() {
    $("#preferencias").hasClass("showscreen") ? ($("#preferencias").hide().removeClass("showscreen"), $("#stardate").fadeIn("slow").addClass("showscreen")) : ($("#stardate").hide().removeClass("showscreen"), $("#preferencias").fadeIn("slow").addClass("showscreen"))
}

function doscalingnew() {
    $("#lcars").hide();
    var e = 1034,
        t = 549,
        n = e / t;
    $("#container").css("margin-top", "0px"), $("#container").css("margin-left", "0px");
    var o = ($("#lcars").width(), $(window).width()),
        s = $(window).height();
    if (s > o) {
        $("#container").css("left", t + "px"), n = s / e;
        var a = t * n,
            c = (o - a) / 2;
        $("#container").css("left", a + c + "px"), $("#lcars").css({
            "-webkit-transform": "translatez(0) scale(" + n + ")",
            "-moz-transform": "translatez(0) scale(" + n + ")",
            "-ms-transform": "translatez(0) scale(" + n + ")",
            "-o-transform": "translatez(0) scale(" + n + ")",
            transform: "translatez(0) scale(" + n + ")"
        })
    } else {
        $("#container").css("left", "0px"), n = o / e;
        var a = t * n;
        if (a > s) var n = s / t;
        var l = e * n;
        if (o > l) {
            var c = (o - l) / 2;
            $("#container").css("margin-left", c + "px")
        }
        if (s > a) {
            var r = (s - a) / 2;
            $("#container").css("margin-top", r + "px")
        }
        $("#lcars").css({
            "-webkit-transform": "translatez(0) scale(" + n + ")",
            "-moz-transform": "translatez(0) scale(" + n + ")",
            "-ms-transform": "translatez(0) scale(" + n + ")",
            "-o-transform": "translatez(0) scale(" + n + ")",
            transform: "translatez(0) scale(" + n + ")"
        })
    }
    $("#lcars").fadeIn("fast")
}

function playSound(e, t) {
    var n = context.createBufferSource();
    n.buffer = e, n.connect(context.destination), n.start(t)
}
$(window).resize(function () {
    doscalingnew()
});
var context, Beep1Buffer = [];
$(function () {
    function e() {
        doscalingnew(), $("#lcars").fadeIn("slow");
        try {
            window.AudioContext = window.AudioContext || window.webkitAudioContext, context = new AudioContext, t("207.wav", 0), t("225.wav", 1)
        } catch (e) {
            $("#audioalert").html("AUDIO IS NOT CURRENTLY SUPPORTED ON THIS BROWSER").fadeIn("slow").delay(5e3).fadeOut("slow")
        }
    }

    function t(e, t) {
        var o = new XMLHttpRequest;
        o.open("GET", e, !0), o.responseType = "arraybuffer", o.onload = function () {
            context.decodeAudioData(o.response, function (e) {
                Beep1Buffer[t] = e
            }, n)
        }, o.send()
    }

    function n() {
        $("#audioalert").html("FAILED TO LOAD AUDIO FILE").fadeIn("slow").delay(5e3).fadeOut("slow")
    }
    window.addEventListener("load", e, !1), $("#lcars").on("click", ".activebutton", function () {
        playSound(Beep1Buffer[$(this).data("sound")], 0)
    })
});