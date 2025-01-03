class SecondaryNav {
  private length: number;
  constructor() {
    this.length = 0;
  }
  addButtons(
    navElement: JQuery<HTMLElement>,
    category: string,
    id: number,
    func: Function
  ): void {
    this.length = index.getLengthByCategory(category);
    navElement.append('<div></div>');
    const dots = $('#secondary-nav > div');
    for (let i = 0; i < this.length - 1; i++) {
      dots.append(`<button></button>`);
    }
    navElement.append(
      `<button><img orientation="left" src="assets/arrow.png"></button>`
    );
    this.disableById(id, category);
    const buttons: NodeListOf<Element> = $$(
      'div[state=shown] #secondary-nav button'
    );
    for (let num: number = 0; num < buttons.length; num++) {
      buttons[num].setAttribute('data-page-number', num.toString());
      buttons[num].addEventListener('click', (e: any) => {
        for (const button of buttons) {
          button.setAttribute('disabled', '');
        }
        const dest: string = e.target.hasAttribute('data-page-number')
          ? e.target.getAttribute('data-page-number')
          : e.target.parentElement.getAttribute('data-page-number');
        func(parseInt(dest));
      });
    }
  }
  disableById(id: number, category: string): void {
    const buttons: JQuery<HTMLElement> = $(
      '.page[state=shown] #secondary-nav button'
    );
    if (id == 1) {
      buttons[0].setAttribute('disabled', '');
      buttons[1].setAttribute('disabled', '');
    }
    if (id == index.getLengthByCategory(category)) {
      buttons[id + 1].setAttribute('disabled', '');
      buttons[id].setAttribute('disabled', '');
    }
    buttons[id]?.setAttribute('disabled', '');
  }
  IdToDestination(destination: number, currentid: number): number {
    let id: number = 0;
    const length = this.length + 1;
    if (destination == 0) {
      id = currentid - 1;
    } else if (destination == length) {
      id = currentid + 1;
    } else {
      id = destination;
    }
    if (id > length || id < 1) id = 1;
    return id;
  }
}
