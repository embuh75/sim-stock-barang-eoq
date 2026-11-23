import { staticPlugin } from "@elysia/static";

export const staticElysia = staticPlugin({
  assets: "public",
  prefix: "/file",
  alwaysStatic: true,
});
