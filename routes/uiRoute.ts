import { Hono, type Context } from "@hono/hono";
import enhance from "@enhance/ssr";
import HelloWorld from "../hello-world.mjs";

const uiRoute = new Hono();

const html = enhance({
  elements: {
    "hello-world": HelloWorld,
  },
});

uiRoute.get("/", (context: Context) =>
  context.html(html`<hello-world test="lol"></hello-world>`)
);

export default uiRoute;
