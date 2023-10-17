import  htmx from "htmx.org";
import { path, params, HtmxExtension, ServerlessHandler, XHRServerless, HtmxElement } from "./types";

export default class Serverless {
    handlers: Map<path, ServerlessHandler>;

    constructor() {
        this.handlers = new Map();
        this.init(window?.htmx);
    }

    init(h?: typeof htmx) {
        h?.defineExtension('serverless', {
            onEvent: this.onEvent.bind(this),
            transformResponse: this.transformResponse.bind(this)
        } as HtmxExtension);
    }

    onEvent(name: string, evt: any) {
        const path:path = evt?.detail?.elt?.['htmx-internal-data']?.path;
        const params:params = evt.detail?.requestConfig?.parameters;

        if ( 
            typeof evt.detail.xhr !== 'undefined' && 
            this.shouldIntercept(path) 
        ) {
            if ( name === "htmx:beforeSend" ) {
                const xhr:XHRServerless = evt.detail.xhr;
                xhr.serverless = {
                    'params': params,
                    'path': path
                };
                xhr.send = () => {
                    xhr.dispatchEvent(new Event('loadstart'));
                    xhr.dispatchEvent(new Event('load'));
                    xhr.dispatchEvent(new Event('loadend'));
                    xhr.readyState == XMLHttpRequest.DONE
                };
                evt.detail.shouldSwap = true;
            }
        }
    }

    transformResponse(text: string, xhr: XHRServerless, elt:HtmxElement) {
        const path:path = xhr?.serverless?.path ?? '';
        const params:params = xhr.serverless?.params;

        if ( this.shouldIntercept(path) ) {
            const handler = this.handlers.get(path) as ServerlessHandler;
            if ( typeof handler === 'function' ) {
                return handler.call(elt, text, params, xhr);
            } else {
                return handler;
            }
        }
        return text;
    }

    shouldIntercept(path:string|undefined) {
        return this.handlers.has( path ?? '');
    }
}