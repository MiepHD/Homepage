class PagesHandler {
  private readonly secondarynav: SecondaryNav;
  private readonly primarynav: PrimaryNav;
  private currentcategory: string;
  private currentid: number;
  constructor() {
    this.secondarynav = new SecondaryNav();
    this.primarynav = new PrimaryNav();
    this.primarynav.initialize(this);
    this.currentcategory = index.getCategories()[0];
    this.currentid = 1;
    window.addEventListener('popstate', () => {
      const [id, category] = location.href.split('#')[1]?.split('.');
      if (!(parseInt(id) == this.currentid && category == this.currentcategory))
        location.reload();
    });
  }
  newPage(category: string, id: number, direction: string): void {
    this.primarynav.switchToCategory(category);
    new XHR(
      `pages/${category}/${index.getFilepath(category, id)}.html`,
      (result: string) => {
        const pagetype: string = id == 1 ? 'main-page' : '';
        $('body').append(`
                <div direction="${direction}" state="shown" class="page ${pagetype}">
                    <main>
                        ${result}
                    </main>
                    <nav id="secondary-nav">
                        <button><img orientation="right" src="assets/arrow.png"></button>
                        <button><img src="assets/home.png"></button>
                    </nav>
                </div>
            `);
        if (id == 1) {
          this.primarynav.show();
        } else {
          this.primarynav.hide();
        }
        this.currentid = id;
        this.currentcategory = category;
        this.secondarynav.addButtons(
          $('.page[state=shown] #secondary-nav'),
          category,
          id,
          (dest: number) => {
            this.loadPage(dest);
          }
        );
      }
    );
  }

  loadPage(destination: number): void {
    const id: number = this.secondarynav.IdToDestination(
      destination,
      this.currentid
    );
    const direction: string = this.currentid > id ? 'left' : 'right';
    const pageElement: Element = $$('.page')[0];
    pageElement.addEventListener(
      'animationend',
      (e: any) => {
        e.target.remove();
        const url: Url = new Url();
        url.set(id, this.currentcategory);
        this.secondarynav.disableById(id, this.currentcategory);
      },
      { once: true }
    );
    pageElement.setAttribute('direction', direction);
    pageElement.setAttribute('state', 'hiding');
    this.newPage(this.currentcategory, id, direction);
  }
  getCurrentCategory(): string {
    return this.currentcategory;
  }
}
