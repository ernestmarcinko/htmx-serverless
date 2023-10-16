import Serverless from "./Serverless";

const serverless = new Serverless(window.htmx);
window.htmxServerless = serverless;

export default serverless;