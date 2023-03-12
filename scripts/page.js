class Page {
    newPage(category, id, direction, page) {
        if (!category) category = index.getCategories()[0];
        if (!id) id = 1;
        if (!direction) direction = "";
        if (!page) page = "main-page";
        primarynav.switchToCategory();
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
            secondarynav.addButtons($(".page[state=shown] #secondary-nav"), category, () => {
                const buttons = $(".page[state=shown] #secondary-nav button");
                if (id == 1) {
                    buttons[0].disabled = true;
                    buttons[1].disabled = true;
                    primarynav.show();
                } else {
                    primarynav.hide();
                }
                if (id == index.getLengthByCategory(category)) {
                    buttons[parseInt(id) + 1].disabled = true;
                    buttons[id].disabled = true;
                }
                buttons[id].disabled = true;
            });
        });
    }

    loadPage(destination) {
        let id = 0;
        let page = "";
        const category = $$("main").getAttribute("page");
        const len = index.getLengthByCategory(category) + 1;
        const currid = parseInt($$(".page").getAttribute("id"));
        if (destination == 0) { id = currid - 1}
        else if (destination == len) { id = currid + 1}
        else { id = destination}
        if(id > len || id < 1) id = 1;
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
        this.newPage(category, id, direction, page);
    }
}