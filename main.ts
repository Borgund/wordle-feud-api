import { Hono, type Context } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import { prettyJSON } from "jsr:@hono/hono/pretty-json";
import uiRoute from "./routes/uiRoute.ts";
import apiRoute from "./routes/apiRoute.ts";

const app = new Hono();
Deno.serve({ port: 1337 }, app.fetch);

app.use(cors()).use(prettyJSON());
app.use(logger());

app.get("/", (context: Context) => {
  console.log("Hello world!");
  return context.json({ message: "Hello world!" });
});

app.get("/posts/:id", ({ req, header, json }: Context) => {
  const page = req.query("page");
  const id = req.param("id");
  header("X-Message", "Hi!");
  return json({ message: `You want see ${page} of ${id}` });
});

app.route("/ui", uiRoute);

app.route("/api", apiRoute);

app.all("*", (context: Context) =>
  context.json({ status: 404, message: "Catch all 404" })
);

export default app;
