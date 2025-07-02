# Simple Request Sender
Sends requests on a interval, useful for keeping track of uptime

## Options
### `name` - string
Name of request, optional
### `url` - string
URL for request, `{ping}` can be added to send the ping from previous request, required
### `sendOnStart` - boolean
If the request should be sent on startup, `false` by default
### `interval` - integer
How often a request should be sent, required
### `waitForResponse` - boolean
If the timeout for the next request should be created after response or not, `false` by default
### `method` - string
HTTP method, `GET` by default
### `headers` - object
HTTP headers, optional
### `body` - any
HTTP request body, optional