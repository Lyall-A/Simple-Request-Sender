const requests = require("./requests.json");

for (const request of requests) {
    let ping = null;

    log(`Starting ${Math.floor(request.interval / 1000)}s interval`);

    if (request.sendOnStart) {
        sendRequest(); // Send request on start
    } else {
        createTimeout(); // Wait for timeout
    }

    async function sendRequest() {
        const sendRequestDate = Date.now(); // For calculating ping

        if (!request.waitForResponse) createTimeout(); // Create timeout before response

        const formatOptions = {
            ping
        };

        await fetch(formatString(request.url, formatOptions), {
            method: request.method,
            headers: request.headers,
            body: request.body
        }).then(res => {
            ping = Date.now() - sendRequestDate;
            log(`Server responded with ${res.status}${res.statusText ? ` (${res.statusText})` : ""} in ${ping}ms`);
        }).catch(err => {
            log("Failed to send request:", err);
        });

        if (request.waitForResponse) createTimeout(); // Create timeout after response
    }
    
    function createTimeout() {
        return setTimeout(sendRequest, request.interval);
    }

    function log(...msg) {
        console.log(`[${new Date().toLocaleString()}] [${request.name || request.url}]`, ...msg);
    }
}

function formatString(string, obj) {
    return string
        .replace(/{(.*?)}/g, (match, group) => group.split(".").reduce((acc, key) => acc && acc[key], obj) ?? "");
}