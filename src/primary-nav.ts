class PrimaryNav {
    private readonly nav: Element;
    private readonly menu: Element;
    constructor() {
        this.nav = $$("#primary-nav")[0];
        this.menu = $$("#primary-menu")[0];
    }
    initialize(pages: PagesHandler): void {
        this.addButtons(() => {
            const elems = this.menu.children as HTMLCollectionOf<HTMLElement>;
            const rot = 180 / (elems.length + 1);
            let currrot = rot + 90;
            for (const elem of elems) {
                elem.style.rotate = `-${currrot}deg`;
                const child = elem.children[0] as HTMLElement;
                child.style.rotate = `${currrot}deg`;
                elem.addEventListener("click", (e: any) => {
                    const link = e.target.hasAttribute("link") ? e.target.getAttribute("link") : e.target.parentElement.getAttribute("link");
                    const currindex = index.getCategories().indexOf(pages.getCurrentCategory());
                    const direction = currindex > index.getCategories().indexOf(link) ? "up" : "down";
                    const pageElement: Element = $$(".page")[0];
                    pageElement.addEventListener("animationend", (e: any) => {
                        e.target.remove();
                        window.location.href = window.location.toString().split("#")[0] + `#1.${link}`;
                    }, { once: true });
                    pageElement.setAttribute("direction", direction);
                    pageElement.setAttribute("state", "hiding");
                    pages.newPage(link, 1, direction);
                });
                currrot = currrot + rot;
            }
        });
        $$("#menu")[0].addEventListener("click", () => {
            if (this.menu.getAttribute("aria-expanded") == "true") {
                this.close();
            } else {
                this.open();
            }
        });
    }
    addButtons(callback: Function): void {
        for (const key of index.getCategories()) {
            $("#primary-menu").append(`
                <button link="${key}">
                    <img src="pages/${key}/icon.png">
                </button>
            `);
        }
        callback();
    }
    switchToCategory(category: string): void {
        for (const elem of this.menu.children) {
            if (elem.getAttribute("link") == category) { elem.setAttribute("disabled", "") }
            else { elem.removeAttribute("disabled") }
        }
    }
    show(): void {
        this.nav.setAttribute("state", "shown");
    }
    hide(): void {
        if (this.nav.getAttribute("state") == "hidden") return;
        this.nav.addEventListener("animationend", (e: any) => {
            e.target.setAttribute("state", "hidden");
        }, { once: true });
        this.nav.setAttribute("state", "hiding");
    }
    open(): void {
        this.menu.setAttribute("state", "shown");
        this.menu.setAttribute("aria-expanded", "true");
    }
    close(): void {
        this.menu.addEventListener("animationend", () => {
            this.menu.setAttribute("state", "hidden");
            this.menu.setAttribute("aria-expanded", "false");
        }, { once: true });
        this.menu.setAttribute("state", "hiding");
    }
}