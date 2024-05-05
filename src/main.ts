const index = new Index();
document.addEventListener('DOMContentLoaded', () => {
  index.load(() => {
    const url: Url = new Url();
    url.get((result: { page: number; category: string } | null) => {
      const pages = new PagesHandler();
      if (result) {
        pages.newPage(result.category, result.page, '');
      } else {
        pages.newPage(index.getCategories()[0], 1, '');
      }
    });
  });
});
