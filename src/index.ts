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
      return this.data[category]["paths"].length;
    } else {
      return 1;
    }
  }
  getNameOfCategory(category: string) {
    if (this.data[category]) {
      return this.data[category]["name"];
    } else {
      return "Unbenannt";
    }
  }
  getFilepath(category: string, id: number) {
    if (this.data[category]) {
      if (id <= this.getLengthByCategory(category)) {
        return this.data[category]["paths"][id - 1];
      } else {
        return '../404/number';
      }
    } else {
      return '../404/category';
    }
  }
}
