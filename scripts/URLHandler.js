"use strict";
class Url {
    getContent(callBackFunction) {
        const url = window.location.toString().split("#");
        if (url.length > 1) {
            const query = url[1].split(".");
            if (query.length > 1) {
                callBackFunction({
                    "page": parseInt(query[0]),
                    "category": query[1]
                });
                return;
            }
        }
        callBackFunction();
    }
}
