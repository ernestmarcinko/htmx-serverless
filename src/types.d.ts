import Serverless from "./Serverless";
import htmx from "htmx.org";

export interface HtmxExtension {
    onEvent?: (name: string, evt: CustomEvent) => any;
    transformResponse?: (text: any, xhr: XMLHttpRequest, elt: any) => any;
    isInlineSwap?: (swapStyle: any) => any;
    handleSwap?: (swapStyle: any, target: any, fragment: any, settleInfo: any) => any;
    encodeParameters?: (xhr: XMLHttpRequest, parameters: any, elt: any) => any;
}

export type path = string;
export type params = {
  [key: string]: any
};

export type HtmxElement = Element & {'htmx-internal-data'?: any}

export type XHRParams = {
  params: params,
  path: path
}
export type XHRServerless = XMLHttpRequest & {
  serverless: XHRParams;
}

type ServerlessHandlerFunc = 
  (this: HtmxElement, text?: string, params?: any , xhr?: XMLHttpRequest) => string

export type ServerlessHandler = ServerlessHandlerFunc|string;

declare module "htmx.org" {
  function defineExtension(name: string, ext: HtmxExtension): void;
  type HtmxExtensions = {
    "serverless": HtmxExtension;
  };
}

declare global {
  interface Window {
    htmxServerless: Serverless;
    htmx: typeof htmx;
  }
}