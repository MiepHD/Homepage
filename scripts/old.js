document.addEventListener("DOMContentLoaded", () => {
    $$("#menu").addEventListener("click", e => {
        const nav = $$("#primary-nav");
        if (e.target.getAttribute("aria-expanded")=="true") {
            nav.setAttribute("state", "hiding");
            nav.addEventListener("animationend", () => {
                nav.setAttribute("state", "hidden");
                e.target.setAttribute("aria-expanded", "false");
            }, {once : true});
        } else {
            nav.setAttribute("state", "shown");
            e.target.setAttribute("aria-expanded", "true");
        }
    });
    getPage();
});
let data = {};
function getPage() {
    new XHR("pages/index.json", result => {
        data = JSON.parse(result);
        for (k of Object.keys(data)) {
        $("#primary-navigation").append(`<button link="${k}"><img src="pages/${k}/icon.png"></button>`);
        }
        let pageid = 1;
        const url = window.location.toString().split("#");
        if (url.length > 1) {
            query = url[1].split(".");
            pageid = query[0];
            k = query[1];
        }
        const type = pageid == 1 ? "main-page" : "page";
        if (type == "page") {
            $$("#primary-nav").addEventListener("animationend", e => {
                e.target.setAttribute("ownstate", "hidden");
            }, { once: true });
            $$("#primary-nav").setAttribute("ownstate", "hiding");
        }
        newPage(k, pageid, "", type);
        elems = $$("#primary-navigation").children;
        rot = 180 / (elems.length + 1);
        currrot = rot + 90;
        for (elem of elems) {
            elem.style.rotate = `-${currrot}deg`;
            elem.addEventListener("click", e => {
                const link = e.target.hasAttribute("link") ? e.target.getAttribute("link") : e.target.parentElement.getAttribute("link");
                const currindex = Object.keys(data).indexOf($$("main").getAttribute("page"));
                const index = Object.keys(data).indexOf(link);
                const direction = currindex > index ? "up" : "down";
                $$(".page").addEventListener("animationend", e => {
                    e.target.remove();
                    window.location = window.location.toString().split("#")[0] + `#1.${link}`;
                }, { once: true });
                $$(".page").setAttribute("direction", direction);
                $$(".page").setAttribute("state", "hiding");
                newPage(link, 1, direction, "main-page");
            });
            currrot = currrot + rot;
        }
    });
}

function loadPage(destination) {
    let id = 0;
    let page = "";
    const currid = parseInt($$(".page").getAttribute("id"));
    if (destination == 0) { id = currid - 1}
    else if (destination == num) { id = currid + 1}
    else { id = destination}
    if(id > num || id < 1) id = 1;
    if (id == 1) {
        $$("#primary-nav").setAttribute("ownstate", "shown");
        page = "main-page";
    }
    else if ($$("#primary-nav").getAttribute("ownstate") != "hidden") {
        $$("#primary-nav").addEventListener("animationend", e => {
            e.target.setAttribute("ownstate", "hidden");
        }, { once: true });
        $$("#primary-nav").setAttribute("ownstate", "hiding");
    }
    const direction = currid > id ? "left" : "right";
    $$(".page").addEventListener("animationend", e => {
        e.target.remove();
        window.location = window.location.toString().split("#")[0] + `#${id}.${category}`;
    }, { once: true });
    $$(".page").setAttribute("direction", direction);
    $$(".page").setAttribute("state", "hiding");
    const category = $$("main").getAttribute("page");
    newPage(category, id, direction, page);
}

function newPage(category, id, direction, page) {
    for (elem of $$("#primary-navigation").children) {
        if (elem.getAttribute("link")==category) { elem.disabled = true }
        else { elem.disabled = false }
    }
    new XHR(`pages/${category}/${id}.html`, result => {
        $("body").append(`
            <div direction="${direction}" state="shown" class="page ${page}" id="${id}">
                <main page="${category}">
                    ${result}
                </main>
                <nav id="secondary-nav">
                    <button><img orientation="right" src="assets/arrow.png"></button>
                    <button><img src="assets/home.png"></button>
                </nav>
            </div>
        `);
        addButtons($(".page[state=shown] #secondary-nav"), category, () => {
            const buttons = $(".page[state=shown] #secondary-nav button");
            if (id == 1) {
                buttons[0].disabled = true;
                buttons[1].disabled = true;
            }
            if (id == data[category]) {
                buttons[parseInt(id) + 1].disabled = true;
                buttons[id].disabled = true;
            }
            buttons[id].disabled = true;
        });
    });
}

function addButtons(p, cat, func) {
    numofpages = parseInt(data[cat]) - 1;
    for (i = 0; i < numofpages; i++) {
        p.append(`<button></button>`);
    }
    p.append(`<button><img orientation="left" src="assets/arrow.png"></button>`);
    initializeSecondaryNavbar(p);
    if (func) func();
}

function initializeSecondaryNavbar(nav) {
    num = -1;
    for (button of nav[0].children) {
        num++;
        button.setAttribute("data-page-number", num);
        button.addEventListener("click", e => {
            for (button of e.target.parentElement.children) {
                button.disabled = true;
            }
            const dest = e.target.hasAttribute("data-page-number") ? e.target.getAttribute("data-page-number") : e.target.parentElement.getAttribute("data-page-number");
            loadPage(dest);
        });
    }
}