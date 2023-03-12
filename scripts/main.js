const primarynav = new PrimaryNav();
const secondarynav = new SecondaryNav();
const index = new Index();
const page = new Page();
document.addEventListener("DOMContentLoaded", () => {
    url = new Url();
    index.load(() => {
        primarynav.initialize();
        url.getContent(result => {
            if (!(result.err)) {
                const type = result.page == 1 ? "main-page" : "page";
                page.newPage(result.category, result.pageid, "", type);
            } else { page.newPage() }
        });
    });
});