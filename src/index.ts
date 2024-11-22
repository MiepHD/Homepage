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
    return this.data[category].length;
  }
  getFilepath(category: string, id: number) {
    return this.data[category][id - 1];
  }
}
