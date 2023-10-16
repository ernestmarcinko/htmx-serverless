import htmx from "htmx.org";
import { HtmxExtension } from "./types";

type path = string;
type HTML = string;

export default class Serverless {
    handlers: Map<path, HTML>;

    constructor(h?: typeof htmx) {
        this.handlers = new Map();
        this.init(h);
    }

    init(h?: typeof htmx) {
        h?.defineExtension('serverless', {
            onEvent: this.onEvent.bind(this),
            transformResponse: this.transformResponse.bind(this)
        } as HtmxExtension);
    }

    onEvent(name: string, evt: any) {
        if ( 
            typeof evt.detail.xhr !== 'undefined' && 
            this.shouldIntercept(evt?.detail?.elt?.['htmx-internal-data']?.path) 
        ) {
            if ( name === "htmx:beforeSend" ) {
                const xhr = evt.detail.xhr;
                xhr.send = () => {
                    xhr.dispatchEvent(new Event('loadstart'));
                    xhr.dispatchEvent(new Event('load'));
                    xhr.dispatchEvent(new Event('loadend'));
                    xhr.readyState == XMLHttpRequest.DONE
                };
            } else if ( name === "htmx:beforeSwap" ) {
                evt.detail.shouldSwap = true;
            }
        }
    }

    transformResponse(text: string, xhr: XMLHttpRequest, elt:Element & {'htmx-internal-data'?: any}) {
        if ( this.shouldIntercept(elt?.['htmx-internal-data']?.path) ) {
            return this.handlers.get(elt?.['htmx-internal-data']?.path)
        }
        return text;
    }

    shouldIntercept(path:string|undefined) {
        path = path ?? '';
        return this.handlers.has(path);
    }
}