class Index {
    load (callback) {
        new XHR("pages/index.json", result => {
            this.data = JSON.parse(result);
            callback();
        });
    }
    getData() { return this.data }
    getCategories() { return Object.keys(this.data) }
    getLengthByCategory(category) { return parseInt(this.data[category])}
}