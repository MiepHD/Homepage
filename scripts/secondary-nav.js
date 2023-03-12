class SecondaryNav {
    addButtons(p, cat, func) {
        const numofpages = index.getLengthByCategory(cat) - 1;
        for (let i = 0; i < numofpages; i++) {
            p.append(`<button></button>`);
        }
        p.append(`<button><img orientation="left" src="assets/arrow.png"></button>`);
        this.initialize(p);
        if (func) func();
    }
    initialize(nav) {
        const buttons = nav[0].children;
        for (let num = 0; num < buttons.length; num++) {
            buttons[num].setAttribute("data-page-number", num);
            buttons[num].addEventListener("click", e => {
                for (const button of buttons) {
                    button.disabled = true;
                }
                const dest = e.target.hasAttribute("data-page-number") ? e.target.getAttribute("data-page-number") : e.target.parentElement.getAttribute("data-page-number");
                page.loadPage(dest);
            });
        }
    }
}