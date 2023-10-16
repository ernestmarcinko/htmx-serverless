# HTMX Serverless requests ![npm](https://img.shields.io/npm/v/htmx-serverless) ![npm](https://img.shields.io/npm/dy/htmx-serverless) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

To use HTMX you require some some sort of a back-end server to handle the XHR requests and responses. In some cases however it is nice to have only a client side interaction, **without a back-end server**.

This extension uses the HTMX built-in Events to intercept some XHR requests before they fire and define response texts on the client side. No need for mock or "fake" server scripts. It is **HTMX without a server** (sort of).

It is really simple:
- The XHR request will not be sent, the ```.send()``` method is overridden for the intercepted request
- The XHR ```loadstart```, ```load``` and ```loadend``` events are dispatched instead, as if the request was finished "successfully"
- Only requests added to the ```htmxServerless.handlers``` Map are intercepted
- Requests are intercepted based on the request path, request arguments does not matter

## Usage

### In HTML head

```html
<!-- htmx  -->
<script src="https://unpkg.com/htmx.org"></script>
<!-- serverless extension -->
<script src="https://unpkg.com/htmx-serverless" defer></script>
```

Then use the window.htmxServerless to set custom handlers and responses.

```javascript
// Requests to "/handler" are replaced with "<div>Custom HTML</div>"
htmxServerless.handlers.set('/handler', '<div>Custom HTML</div>');
```

### In custom bundles

```javascript
import htmx from "htmx.org";
import htmxServerless from "htmx-serverless";

// Requests to "/handler" are replaced with "<div>Custom HTML</div>"
htmxServerless.handlers.set('/handler', '<div>Custom HTML</div>');
```

## Examples

Assume we have a button with the `serverless` **hx-ext** sattribute, which triggers a request to the path "/clicked":

```html
<button hx-get="/clicked" hx-swap="outerHTML" hx-ext="serverless">
    Click to replace!
</button>
```

To define a serverless client side response to "/clicked" in the handlers Map():

```javascript
htmxServerless.handlers.set('/clicked', 
    `<button hx-get="/clicked" hx-swap="outerHTML" hx-ext="serverless">
        Hey, you clicked me!
    </button>`
);
```

The button is then replaced with the HTML defined without triggering a request to the server. It's that simple.

## What else?

Nothing actually. This is only a baseline solution, but it works. There are no fancy features, as htmx is oath to be a small but effective library. With some creativity, you could make this more convenient, I leave it up to you :)