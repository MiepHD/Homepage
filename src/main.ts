
const index = new Index();
document.addEventListener("DOMContentLoaded", () => {
    const url: Url = new Url();
    index.load(() => {
        url.getContent((result: {page: number, category: string} | null) => {
            const page = new Page();
            if (result) {
                const type: string = result.page == 1 ? "main-page" : "page";
                page.newPage(result.category, result.page, "", type);
            } else { page.newPage(index.getCategories()[0], 1, "", "main-page") }
        });
    });
});