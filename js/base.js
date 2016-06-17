BASE_URL = "file://C:/Users/Adam/Documents/GitHub/Homepage/";
NUM_BACK = 0;

function getNumBack(cls) {
    n = 0;
    while (cls.indexOf("/") != -1) {
        cls = cls.substr(cls.indexOf("/") + 1);
        n += 1;
    }
    return n - 1;
}

function genNBS() {
    n = 0;
    s = "";
    while (n < NUM_BACK) {
        n += 1;
        s += "../";
    }
    return s;
}

function replaceAll(str, s, c) {
    while (str.indexOf(s) != -1) {
        str = str.replace(s, c);
    }
    return str;
}

function button(element, in_new) {
    var open_new = element.dataset.isext == "yes" || in_new;
    if (open_new) {
        window.open(element.dataset.href);
    } else {
        window.open(element.dataset.href, "_self");
    }
}

function build_popout(title, content) {
    var popout = document.createElement("div");
    popout.id = "popout";
    popout.setAttribute("class", "popout");
    var header = document.createElement("div");
    var h = document.createElement("h3");
    h.innerHTML = title;
    header.id = "popout-title";
    content.id = "popout-content";
    var cls = document.createElement("div")
    cls.id = "popout-close";
    cls.innerHTML = "Close";
    cls.onclick = function () {
        $(popout).fadeOut(500, function () {
            $(this).remove();
        });
    }
    header.appendChild(h);
    header.appendChild(cls);
    popout.appendChild(header);
    popout.appendChild(content);
    $(popout).hide();
    popout.header = header;
    return popout;
}

function text_popout(title, text) {
    if (document.getElementById("popout") != undefined) { return; }
    var block = document.createElement("p");
    block.innerHTML = text;
    var out = build_popout(title, block);
    document.body.appendChild(out);
    $(out).fadeIn(500);
}

function image_popout(title, img) {
    if (document.getElementById("popout") != undefined) { return; }
    if (title == false) {
        title = img.title;
    }
    var out = null;
    if (typeof (img) == "string") {
        i = document.createElement("img");
        i.src = img;
        out = build_popout(title, i)
    } else {
        out = build_popout(title, img.cloneNode());
    }
    document.body.appendChild(out);
    $(out).fadeIn(500);
}

function iframe_popout(title, src) {
    if (document.getElementById("popout") != undefined) { return; }
    var frame = document.createElement("iframe");
    frame.src = src;
    var out = build_popout(title, frame);
    var opn = document.createElement("div")
    opn.id = "popout-close";
    opn.setAttribute("style", "margin-left: 0; color: #6483e3;");
    opn.innerHTML = "Open";
    opn.onclick = function () {
        window.open(src);
        $(popout).fadeOut(500, function () {
            $(this).remove();
        });
    }
    out.header.insertBefore(opn, out.header.lastChild);
    document.body.appendChild(out);
    $(out).fadeIn(500);
}

function loadContentTo(json, key, element) {
    element.innerHTML = json[key];
}

function loadPageContent2(name, data) {
    $.each(data, function (key, value) {
        $.ajax({
            beforeSend: function (xhr) {
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("text/plain");
                }
            },
            url: genNBS() + "resources/" + name + "/" + value.replace("img:", ""),
            dataType: "text",
            type: 'GET',
            async: true,
            success: function (text) {
                if (document.getElementById(key) == undefined) {
                    var new_div = document.createElement("div");
                    new_div.id = key;
                    document.insertBefore(new_div, document.getElementById("footer"));
                }
                if (value.startsWith("img:")) {
                    var new_img = document.createElement("img");
                    new_img.src = value.startsWith("img:h") ? value.replace("img:", "") : genNBS() + "resources/" + name + "/" + value.replace("img:", "");
                    new_img.alt = new_img.src;
                    new_img.onclick = function () {
                        image_popout("Image", new_img);
                    }
                    document.getElementById(key).appendChild(new_img);
                } else {
                    $("#" + key).html(text + $("#" + key).html());
                }
            },
            error: function () {
                text_popout("Error", "Unable to load <a href='" + genNBS() + "resources/" + name + "/" + value + "'> " + value + "</a>");
            }
        });
    });
}

function loadStandardPage(data) {
    data = replaceAll(data, "REP/", BASE_URL);
    var existing_content = null;
    if (document.getElementById("content") != undefined) {
        existing_content = document.getElementById("content").innerHTML;
        document.body.removeChild(document.getElementById("content"));
    }
    document.body.innerHTML = document.body.innerHTML + data;
    if (existing_content != null) {
        document.getElementById("content").innerHTML = existing_content;
    }
}

function load(location, onSuccess) {
    $.ajax({
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("text/plain");
            }
        },
        url: location,
        dataType: "text",
        type: "GET",
        async: true,
        success: function (d) {
            onSuccess(d);
        },
        error: function (e) {
            console.log(e);
            text_popout("Error", "The resource <a href='" + location + "'>failed to load</a>. State: <br>" + e.statusText);
        }
    });
}

function loadGallery(location, galleryDiv) {
    $.ajax({
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        },
        url: location,
        dataType: "json",
        type: "GET",
        async: true,
        success: function (gdata) {
            $.each(gdata, function (key, value) {
                var new_img = document.createElement("img");
                new_img.src = value;
                new_img.alt = value;
                new_img.onclick = function () {
                    galleryDiv.getElementsByTagName("img")[0].src = value;
                    galleryDiv.getElementsByTagName("img")[0].onclick = function () {
                        image_popout("Gallery Image: " + key, new_img);
                    }
                }
                galleryDiv.getElementsByClassName("gallery-bottom")[0].appendChild(new_img);
            });
            galleryDiv.getElementsByClassName("gallery-bottom")[0].children[0].onclick();
        },
        error: function (e) {
            console.log(e);
            text_popout("Error", "The gallery file from <a href='" + location + "'>here</a> failed to load. State: <br>" + e.statusText);
        }
    })
}

function galleryNext(nextBox) {
    var gallery = nextBox.parentNode.parentNode;
    var imglist = gallery.getElementsByClassName("gallery-bottom")[0].getElementsByTagName("img");
    var current = parseInt(gallery.dataset.current);
    if (current + 1 >= imglist.length) {
        current = 0;
    } else {
        current += 1;
    }
    console.log(current);
    imglist[current].onclick();
    console.log(imglist[current]);
    gallery.dataset.current = current;
}

function loadPageContent(name, build_standard) {
    if (document.getElementById("js-test") != undefined) {
        document.getElementById("content").removeChild(document.getElementById("js-test"));
    }
    NUM_BACK = getNumBack(window.location.href.substr(BASE_URL.length));
    if (build_standard == true) {
        $.ajax({
            beforeSend: function (xhr) {
                if (xhr.overrideMimeType) {
                    xhr.overrideMimeType("text/plain");
                }
            },
            url: genNBS() + "resources/standard_page.txt",
            dataType: "text",
            type: "GET",
            async: true,
            success: function (d) {
                loadStandardPage(d);
            },
            error: function (e) {
                console.log(e)
                text_popout("Error", "The basic page template failed to load from <a href='" + genNBS() + "resources/standard_page.txt'>here</a>. State: <br>" + e.statusText);
            }
        });
    }
    if (name == null) {
        return;
    }
    $.ajax({
        beforeSend: function (xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        },
        url: genNBS() + "resources/" + name + "/page.json",
        dataType: "json",
        type: "GET",
        async: true,
        success: function (data) {
            loadPageContent2(name, data);
        },
        error: function () {
            text_popout("Error", "Unable to load <a href='" + genNBS() + "resources/" + name + "/page.json'>page.json</a>");
        }
    });
}