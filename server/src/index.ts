import { Elysia } from "elysia";
import { api } from "./modules";
import { kors } from "./plugins/cors";
import { openApi } from "./plugins/openapi";
import { staticElysia } from "./plugins/static-plugin";
import logger from "./utils/logger";

const elysia = new Elysia({ prefix: "/api/v1" });
const PORT = process.env.PORT || 3000;

// Plugins
elysia.use(kors);
elysia.use(openApi);
elysia.use(staticElysia);

// Route List
elysia.use(api);

const startServer = async () => {
  elysia.listen(PORT, () => {
    logger.info(
      `🦊 Elysia server berjalan di http://${elysia.server?.hostname}:${elysia.server?.port}/api/v1`,
    );
    logger.info(
      `Liat dokumentasi di http://${elysia.server?.hostname}:${elysia.server?.port}/api/v1/openapi`,
    );
  });
};

startServer();
