class PrimaryNav {
    initialize () {
        this.nav = $$("#primary-nav");
        this.menu = $$("#primary-menu");
        this.addButtons(() => {
            const elems = this.menu.children;
            const rot = 180 / (elems.length + 1);
            let currrot = rot + 90;
            for (const elem of elems) {
                elem.style.rotate = `-${currrot}deg`;
                elem.children[0].style.rotate = `${currrot}deg`;
                elem.addEventListener("click", e => {
                    const link = e.target.hasAttribute("link") ? e.target.getAttribute("link") : e.target.parentElement.getAttribute("link");
                    const currindex = index.getCategories().indexOf($$("main").getAttribute("page"));
                    const direction = currindex > index.getCategories().indexOf(link) ? "up" : "down";
                    $$(".page").addEventListener("animationend", e => {
                        e.target.remove();
                        window.location = window.location.toString().split("#")[0] + `#1.${link}`;
                    }, { once: true });
                    $$(".page").setAttribute("direction", direction);
                    $$(".page").setAttribute("state", "hiding");
                    page.newPage(link, 1, direction, "main-page");
                });
                currrot = currrot + rot;
            }
        });
        $$("#menu").addEventListener("click", () => {
            if (this.menu.getAttribute("aria-expanded") == "true") {
                this.close();
            } else {
                this.open();
            }
        });
    }
    addButtons (callback) {
        for (const key of index.getCategories()) {
            $("#primary-menu").append(`
                <button link="${key}">
                    <img src="pages/${key}/icon.png">
                </button>
            `);
        }
        callback();
    }
    switchToCategory (category) {
        for (const elem of this.menu.children) {
            if (elem.getAttribute("link")==category) { elem.disabled = true }
            else { elem.disabled = false }
        }
    }
    show () {
        this.nav.setAttribute("state", "shown");
    }
    hide () {
        this.nav.addEventListener("animationend", e => {
            e.target.setAttribute("state", "hidden");
        }, { once: true });
        this.nav.setAttribute("state", "hiding");
    }
    open () {
        this.menu.setAttribute("state", "shown");
        this.menu.setAttribute("aria-expanded", "true");
    }
    close () {
        this.menu.addEventListener("animationend", () => {
            this.menu.setAttribute("state", "hidden");
            this.menu.setAttribute("aria-expanded", "false");
        }, { once: true });
        this.menu.setAttribute("state", "hiding");
    }
}