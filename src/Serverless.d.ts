import htmx from "htmx.org";
type path = string;
type HTML = string;
export default class Serverless {
    handlers: Map<path, HTML>;
    constructor(h?: typeof htmx);
    init(h?: typeof htmx): void;
    onEvent(name: string, evt: any): void;
    transformResponse(text: string, xhr: XMLHttpRequest, elt: Element & {
        'htmx-internal-data'?: any;
    }): string | undefined;
    shouldIntercept(path: string | undefined): boolean;
}
export {};
