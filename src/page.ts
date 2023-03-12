class Page {
    secondarynav: SecondaryNav;
    primarynav: PrimaryNav;
    constructor () {
        this.secondarynav = new SecondaryNav();
        this.primarynav = new PrimaryNav();
        this.primarynav.initialize(this);
    }
    newPage(category: string, id: number, direction: string, page: string) {
        this.primarynav.switchToCategory(category);
        new XHR(`pages/${category}/${id}.html`, (result: string) => {
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
            this.secondarynav.addButtons($(".page[state=shown] #secondary-nav"), category, id, (dest: number) => {
                this.loadPage(dest);
            });
        });
    }

    loadPage(destination: number) {
        let id: number = 0;
        let page: string = "";
        const category = this.getCategory();
        const len = index.getLengthByCategory(category) + 1;
        const currid = this.getId();
        if (destination == 0) { id = currid - 1}
        else if (destination == len) { id = currid + 1}
        else { id = destination}
        if(id > len || id < 1) id = 1;
        const direction: string = currid > id ? "left" : "right";
        const pageElement: Element = $$(".page")[0];
        pageElement.addEventListener("animationend", (e: any) => {
            e.target.remove();
            window.location.href = window.location.toString().split("#")[0] + `#${id}.${category}`;
            this.secondarynav.disableById(id, category);
            if (id == 1) {
                this.primarynav.show();
            } else {
                this.primarynav.hide();
            }
        }, { once: true });
        pageElement.setAttribute("direction", direction);
        pageElement.setAttribute("state", "hiding");
        this.newPage(category, id, direction, page);
    }
    getId() {
        const id: string | null = $$(".page")[0].getAttribute("id");
        const result: number = id ? parseInt(id) : 1;
        return result;
    }
    getCategory() {
        const category: string | null = $$("main")[0].getAttribute("page");
        const result: string = category ? category : index.getCategories()[0];
        return result;
    }
}