import { Router } from "express";

const salesRouter = Router()


salesRouter.get("/");
salesRouter.get("/:id");
salesRouter.post("/");
salesRouter.put("/:id");
salesRouter.delete("/:id");

export default salesRouter