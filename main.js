// JavaScript Document

var isBig = true;
var isSubPage = false;

var menuProjects = [
    ["Web Design", "projects/webdesign.html"],
    //["PiGlass", "projects/piglass.html"],
    //["Accessibility", "projects/accessibility.html"],
    ["GNews", "projects/gnews.html"],
    ["Flashcards", "projects/flashcards.html"],
    ["Python OS", "projects/pythonos.html"],
    ["On GitHub", "http://www.github.com/furmada"]
];

var menuInfo = [
    ["About Me", "#about"],
    ["School", "#school"],
    ["Connect", "#connect"]
];

var menuMore = [
    ["Ideas", "code/ideas.html"],
    //["FTP Server", "ftp://131.191.38.209"],
    //["Webcam", "http://192.168.2.214"],
    ["Stadium", "http://www.stadiumtigers.org"]
];

var mobilecheck = function () {
    var check = false;
    (function (a, b) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function attachMobileCss() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "mobile.css";
    document.getElementsByTagName("head")[0].appendChild(link);
}

function init() {
    if (mobilecheck()) {
        attachMobileCss();
    }
    $('#admin_hidden').fadeOut();
    resizeHeader();
    document.getElementById("menu0").innerHTML = "";
    var div0 = document.createElement("div");
    var p0 = document.createElement("p");
    p0.innerHTML = "Projects";
    $(div0).attr("id", "menu0div");
    document.getElementById("menu0").appendChild(div0);
    document.getElementById("menu0").appendChild(p0);
    menuProjects.forEach(function (toadd) {
        var newelem = document.createElement("a");
        if (toadd[1].indexOf("http://") == -1 && toadd[1].indexOf("https://") == -1 && toadd[1].indexOf("ftp://") == -1) {
            if (isSubPage) {
                $(newelem).attr("href", "../" + toadd[1]);
            }
            else {
                $(newelem).attr("href", toadd[1]);
            }
        }
        else {
            $(newelem).attr("href", toadd[1]);
        }
        newelem.innerHTML = toadd[0];
        document.getElementById("menu0div").appendChild(newelem);
        document.getElementById("menu0div").appendChild(document.createElement("br"));
    });
    document.getElementById("menu1").innerHTML = "";
    var div1 = document.createElement("div");
    var p1 = document.createElement("p");
    p1.innerHTML = "Information";
    $(div1).attr("id", "menu1div");
    document.getElementById("menu1").appendChild(div1);
    document.getElementById("menu1").appendChild(p1);
    menuInfo.forEach(function (toadd) {
        var newelem = document.createElement("a");
        if (toadd[1].indexOf("http://") == -1 && toadd[1].indexOf("https://") == -1 && toadd[1].indexOf("ftp://") == -1) {
            if (isSubPage) {
                $(newelem).attr("href", "../index.html" + toadd[1]);
            }
            else {
                $(newelem).attr("href", toadd[1]);
            }
        }
        else {
            $(newelem).attr("href", toadd[1]);
        }
        newelem.innerHTML = toadd[0];
        document.getElementById("menu1div").appendChild(newelem);
        document.getElementById("menu1div").appendChild(document.createElement("br"));
    });
    document.getElementById("menu2").innerHTML = "";
    var div2 = document.createElement("div");
    var p2 = document.createElement("p");
    p2.innerHTML = "Information";
    $(div2).attr("id", "menu2div");
    document.getElementById("menu2").appendChild(div2);
    document.getElementById("menu2").appendChild(p2);
    menuMore.forEach(function (toadd) {
        var newelem = document.createElement("a");
        if (toadd[1].indexOf("http://") == -1 && toadd[1].indexOf("https://") == -1 && toadd[1].indexOf("ftp://") == -1) {
            if (isSubPage) {
                $(newelem).attr("href", "../" + toadd[1]);
            }
            else {
                $(newelem).attr("href", toadd[1]);
            }
        }
        else {
            $(newelem).attr("href", toadd[1]);
        }
        newelem.innerHTML = toadd[0];
        document.getElementById("menu2div").appendChild(newelem);
        document.getElementById("menu2div").appendChild(document.createElement("br"));
    });
    if (!isSubPage) {
        $("#header h1").click(function () { window.open("index.html", "_self"); });
    }
    else {
        $("#header h1").click(function () { window.open("../index.html", "_self"); });
    }
    $(document).scroll(
        function () {
            if ($(document).scrollTop() == 0 && !isBig) {
                maxiHeader();
                isBig = true;
            }
            else {
                if (isBig == true) {
                    isBig = false;
                    miniHeader();
                }
                moveHeader();
            }
        });
}

var showMenu = function(elemid){
	console.log("showMenu "+elemid+" div");
	$(elemid+" div").fadeIn();
}

var hideMenu = function(elemid){
	console.log("hideMenu "+elemid+" div");
	$(elemid+" div").fadeOut();
}

var miniHeader = function () {
    console.log("Detected scroll down");
    $("#header").animate({ 'height': '10vh' }, 200);
    $("#header h1").animate({ 'font-size': String(parseInt($("#header h1").css('font-size')) / 2) }, 300);
    $("#header h1").click(function () { $("body").animate({ scrollTop: 0 }, 500); });
    resizeHeader();
}

var maxiHeader = function () {
    console.log("Detected scroll up");
    $("#header").animate({ 'top': "-5px" }, 100);
    $("#header").animate({ 'height': '20vh' }, 200);
    $("#header h1").animate({ 'font-size': String(parseInt($("#header h1").css('font-size')) * 2) }, 300);
    if (!isSubPage) {
        $("#header h1").click(function () { window.open("index.html", "_self"); });
    }
    else {
        $("#header h1").click(function () { window.open("../index.html", "_self"); });
    }
    resizeHeader();
}

var moveHeader = function () {
    $("#header").animate({'top': String($(document).scrollTop()-1) + "px"}, 50);
}

function resizeHeader(){
    $("#header h1").css('font-size', "10px");
    while( $('#header h1').height() < $('#header').height()-45 ) {
        $('#header h1').css('font-size', (parseInt($('#header h1').css('font-size')) + 1) + "px" );
    }
    $("#menu0").css('margin-right', '20vw');
    $("#menu0").click(function(){showMenu("#menu0")});
    $("#menu0").hover(function(){showMenu("#menu0")}, function(){hideMenu("#menu0")});
    $("#menu1").hover(function(){showMenu("#menu1")}, function(){hideMenu("#menu1")});
    $("#menu1").click(function(){showMenu("#menu1")});
    $("#menu2").css('margin-left', '20vw');
    $("#menu2").click(function(){showMenu("#menu2")});
    $("#menu2").hover(function(){showMenu("#menu2")}, function(){hideMenu("#menu2")});
}