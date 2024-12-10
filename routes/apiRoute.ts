import { Hono, type Context } from "@hono/hono";
import { HTTPException } from "@hono/hono/http-exception";
import { Next } from "@hono/hono/types";

import Pocketbase from "npm:pocketbase";
const apiRoute = new Hono();

const pb = (() => {
  return new Pocketbase(Deno.env.get("PB_API_URL")!);
})();

apiRoute.use(
  "/*",
  async (context: Context, next: Next) => await auth(context, next)
);

apiRoute.get("/auth", (context: Context) => {
  console.log("🔒 Authenticated", context.get("Authenticated"));
  return context.json({ code: 200, message: "Authenticated" });
});

apiRoute.get("/test", (context: Context) => {
  return context.json({ message: "YEEEHA!" });
});

export async function auth(context: Context, next: Next) {
  console.log("🔒 authenticating...");
  const apiKey = context.req.header("x-api-key");
  pb.autoCancellation(false);
  try {
    await pb
      .collection("_superusers")
      .authWithPassword(
        Deno.env.get("PB_API_ADMIN_USER")!,
        Deno.env.get("PB_API_ADMIN_PASSWORD")!,
        {
          // This will trigger auto refresh or auto reauthentication in case
          // the token has expired or is going to expire in the next 30 minutes.
          autoRefreshThreshold: 30 * 60,
        }
      )
      .catch((e) => console.error(e.originalError))
      .then(() => console.log("🔓 Authenticated as admin..."));
  } catch (error) {
    console.error(error);
  }

  try {
    console.log("🔒 Validating API key...");
    const data = await pb
      .collection("api_keys")
      .getFirstListItem(`key="${apiKey}"`);
    if (!data || !data.id) {
      throw new HTTPException(401);
    }
  } catch (error) {
    console.error(error);
    throw new HTTPException(401, {
      message: "API key is not valid",
    });
  }
  console.log("🔓 API key validated successfully.");
  context.set("Authenticated", true);
  await next();
  return context.json({ message: "Success" });
}

export default apiRoute;
