class SecondaryNav {
    addButtons(p: JQuery<HTMLElement>, cat: string, id: number, func: Function) {
        const numofpages = index.getLengthByCategory(cat) - 1;
        for (let i = 0; i < numofpages; i++) {
            p.append(`<button></button>`);
        }
        p.append(`<button><img orientation="left" src="assets/arrow.png"></button>`);
        this.disableById(id, cat);
        const buttons: HTMLCollection = p[0].children;
        for (let num : number = 0; num < buttons.length; num++) {
            buttons[num].setAttribute("data-page-number", num.toString());
            buttons[num].addEventListener("click", (e: any) => {
                for (const button of buttons) {
                    button.setAttribute("disabled", "");
                }
                const dest: string = e.target.hasAttribute("data-page-number") ? e.target.getAttribute("data-page-number") : e.target.parentElement.getAttribute("data-page-number");
                func(parseInt(dest));
            });
        }
    }
    disableById(id: number, category: string) {
        const buttons: JQuery<HTMLElement> = $(".page[state=shown] #secondary-nav button");
        if (id == 1) {
            buttons[0].setAttribute("disabled", "");
            buttons[1].setAttribute("disabled", "");
        } else if (id == index.getLengthByCategory(category)) {
            buttons[id + 1].setAttribute("disabled", "");
            buttons[id].setAttribute("disabled", "");
        }
        buttons[id].setAttribute("disabled", "");
    }
}