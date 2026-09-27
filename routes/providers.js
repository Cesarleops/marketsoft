import { Router } from "express";

const providersRouter = Router()

providersRouter.get("/");
providersRouter.get("/:id");
providersRouter.post("/");
providersRouter.put("/:id");
providersRouter.delete("/:id");

export default providersRouter