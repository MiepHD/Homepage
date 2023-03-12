"use strict";
class XHR {
    constructor(file, func) {
        const xhttp = new XMLHttpRequest();
        xhttp.onloadend = () => {
            if (xhttp.status == 404)
                func(404);
        };
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                func(xhttp.responseText);
            }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
    }
}
