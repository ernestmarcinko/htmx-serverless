import Serverless from "./Serverless";

const htmxServerless = new Serverless(window.htmx);
window.htmxServerless = htmxServerless;

export default htmxServerless;