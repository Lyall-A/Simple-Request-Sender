const requests = require("./requests.json");

for (const request of requests) {
    log(`Starting ${Math.floor(request.interval / 1000)}s interval`);

    if (request.sendOnStart) {
        sendRequest();
    } else {
        setTimeout(sendRequest, request.interval);
    }

    async function sendRequest() {
        await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: request.body
        }).then(res => {
            log(`Server responded with ${res.status}${res.statusText ? ` - ${res.statusText}` : ""}`);
        }).catch(err => {
            log("Failed to send request:", err);
        });

        setTimeout(sendRequest, request.interval);
    }

    function log(...msg) {
        console.log(`[${new Date().toLocaleString()}] [${request.name || request.url}]`, ...msg);
    }
}