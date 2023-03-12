class Index {
    data: any;
    constructor () {
        this.data = {};
    }
    load (callback: Function) {
        new XHR("pages/index.json", (result: string) => {
            this.data = JSON.parse(result);
            callback();
        });
    }
    getData() { return this.data }
    getCategories() { return Object.keys(this.data) }
    getLengthByCategory(category: string) { return parseInt(this.data[category])}
}