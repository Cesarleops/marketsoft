import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/");
productsRouter.get("/:id");
productsRouter.post("/");
productsRouter.put("/:id");
productsRouter.delete("/:id");

export default productsRouter;
