import htmx from "htmx.org";
import { path, ServerlessHandler, XHRServerless, HtmxElement } from "./types";
export default class Serverless {
    handlers: Map<path, ServerlessHandler>;
    constructor();
    init(h?: typeof htmx): void;
    onEvent(name: string, evt: any): void;
    transformResponse(text: string, xhr: XHRServerless, elt: HtmxElement): string;
    shouldIntercept(path: string | undefined): boolean;
}
