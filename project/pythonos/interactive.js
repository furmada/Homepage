curr_page = "Home";
page_history = ["Home"];
notifications = false;
clicks = 0;

hover_hints = {
    "interactive-top": "The app displays here.",
    "interactive-bottom": "The bottom toolbar contains the current app's name and the time.",
    "interactive-menu": "The launcher (menu) button opens the launcher with one click and closes it with a long press.",
    "interactive-aboutIcon": "Click the app's icon to open it. This is the About app.",
    "interactive-calcIcon": "This is the calculator app.",
    "interactive-nMenu": "The notifications menu contains a list of all the received notifications.",
    "interactive-notification": "Click the clock to open the notifications menu.",
    "reset": "Hover over parts of the demo to see what they do."
}

function clickAppBg() {
    clicks += 1;
    if (clicks == 3) {
        var new_p = document.createElement("p");
        new_p.innerHTML = "Sorry to tell you this, but not every app works in the demo. To try out the real thing, download the latest release <a href='https://www.github.com/furmada/PythonOS'>here</a>.";
        document.getElementById("interactive-textArea").appendChild(new_p);
    }
}

function displayHoverHint(elem) {
    if (typeof (elem) == "string") {
        document.getElementById("interactive-hoverHint").innerHTML = hover_hints[elem];
        return;
    }
    document.getElementById("interactive-hoverHint").innerHTML = hover_hints[elem.id];
}

function open_notifications() {
    if (!notifications) {
        notifications = true;
        var n_img = document.createElement("img");
        n_img.src = "notifications.png";
        n_img.id = "interactive-nMenu";
        n_img.onmouseover = function () {
            displayHoverHint(n_img);
        }
        document.getElementById("interactive").appendChild(n_img);
    } else {
        document.getElementById("interactive").removeChild(document.getElementById("interactive-nMenu"));
        notifications = false;
    }
}

function open_page(name) {
    if (curr_page == "Launcher") {
        document.getElementById("interactive").removeChild(document.getElementById("interactive-aboutIcon"));
        document.getElementById("interactive").removeChild(document.getElementById("interactive-calcIcon"));
    }
    curr_page = name;
    if (name != "Home") {
        page_history.push(name);
    }
    if(name == "Launcher"){
        document.getElementById("interactive-top").src = "top_launcher.png";
        document.getElementById("interactive-bottom").src = "bottom_launcher.png";
        var a_img = document.createElement("img");
        a_img.src = "icon_about.png";
        a_img.id = "interactive-aboutIcon";
        a_img.onclick = function () {
            open_page("About");
        }
        a_img.onmouseover = function () {
            displayHoverHint(a_img);
        }
        document.getElementById("interactive").appendChild(a_img);
        var c_img = document.createElement("img");
        c_img.src = "icon_calculator.png";
        c_img.id = "interactive-calcIcon";
        c_img.onclick = function () {
            open_page("Calculator");
        }
        c_img.onmouseover = function () {
            displayHoverHint(c_img);
        }
        document.getElementById("interactive").appendChild(c_img);
    }
    if (name == "Home") {
        document.getElementById("interactive-top").src = "top_home.png";
        document.getElementById("interactive-bottom").src = "bottom_home.png";
    }
    if (name == "About") {
        document.getElementById("interactive-top").src = "top_about.png";
        document.getElementById("interactive-bottom").src = "bottom_about.png";
    }
    if (name == "Calculator") {
        document.getElementById("interactive-top").src = "top_calculator.png";
        document.getElementById("interactive-bottom").src = "bottom_calculator.png";
    }
}

function open_launcher() {
    if (curr_page != "Home") {
        page_history = page_history.slice(0, page_history.length-1);
        if (page_history[page_history.length - 1] == "Launcher") {
            page_history = page_history.slice(0, page_history.length - 1);
        }
        open_page(page_history[page_history.length-1]);
    } else {
        open_page("Launcher");
    }
}
