import { Router } from "express";
import {
  createProvider,
  deleteProvider,
  getProviderById,
  getProviders,
  updateProvider,
} from "../controllers/providers.js";

const providersRouter = Router();

providersRouter.get("/", getProviders);
providersRouter.get("/:id", getProviderById);
providersRouter.post("/", createProvider);
providersRouter.put("/:id", updateProvider);
providersRouter.delete("/:id", deleteProvider);

export default providersRouter;
