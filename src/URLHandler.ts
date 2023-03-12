class Url {
    get(callBackFunction: Function): void {
        const url: Array<string> = window.location.href.toString().split("#");
        if (url.length > 1) {
            const query: Array<string> = url[1].split(".");
            if (query.length > 1) {
                callBackFunction( {
                    "page": parseInt(query[0]),
                    "category": query[1]
                });
                return;
            }
        }
        callBackFunction();
    }
    set(id: number, category: string): void {
        window.location.href = window.location.toString().split("#")[0] + `#${id}.${category}`;
    }
}