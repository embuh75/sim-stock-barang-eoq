import { Elysia } from "elysia";
import { authRoute } from "./auth";
import { adminRoute } from "./admin";
import { sistem } from "./sistem";
import { auth } from "../plugins/auth";

export const api = new Elysia().mount(auth.handler);

// Route List
api.use(authRoute);
api.use(adminRoute);
api.use(sistem);
