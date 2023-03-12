"use strict";
class Page {
    constructor() {
        this.secondarynav = new SecondaryNav();
        this.primarynav = new PrimaryNav();
        this.primarynav.initialize(this);
    }
    newPage(category, id, direction, page) {
        this.primarynav.switchToCategory(category);
        new XHR(`pages/${category}/${id}.html`, (result) => {
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
            this.secondarynav.addButtons($(".page[state=shown] #secondary-nav"), category, id, (dest) => {
                this.loadPage(dest);
            });
        });
    }
    loadPage(destination) {
        let id = 0;
        let page = "";
        const category = this.getCategory();
        const len = index.getLengthByCategory(category) + 1;
        const currid = this.getId();
        if (destination == 0) {
            id = currid - 1;
        }
        else if (destination == len) {
            id = currid + 1;
        }
        else {
            id = destination;
        }
        if (id > len || id < 1)
            id = 1;
        const direction = currid > id ? "left" : "right";
        const pageElement = $$(".page")[0];
        pageElement.addEventListener("animationend", (e) => {
            e.target.remove();
            window.location.href = window.location.toString().split("#")[0] + `#${id}.${category}`;
            this.secondarynav.disableById(id, category);
            if (id == 1) {
                this.primarynav.show();
            }
            else {
                this.primarynav.hide();
            }
        }, { once: true });
        pageElement.setAttribute("direction", direction);
        pageElement.setAttribute("state", "hiding");
        this.newPage(category, id, direction, page);
    }
    getId() {
        const id = $$(".page")[0].getAttribute("id");
        const result = id ? parseInt(id) : 1;
        return result;
    }
    getCategory() {
        const category = $$("main")[0].getAttribute("page");
        const result = category ? category : index.getCategories()[0];
        return result;
    }
}
