//Manages the
class Index {
  private data: any;
  constructor() {
    this.data = {};
  }
  public load(callback: Function): void {
    new XHR('pages/index.json', (result: string) => {
      this.data = JSON.parse(result);
      callback();
    });
  }
  getData() {
    return this.data;
  }
  getCategories() {
    return Object.keys(this.data);
  }
  getLengthByCategory(category: string) {
    if (this.data[category]) {
      return this.data[category].length;
    } else {
      return 1;
    }
  }
  getFilepath(category: string, id: number) {
    if (this.data[category]) {
      if (id <= this.getLengthByCategory(category)) {
        return this.data[category][id - 1];
      } else {
        return '../404/number';
      }
    } else {
      return '../404/category';
    }
  }
}
