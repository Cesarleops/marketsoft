import { Router } from "express";
import {
  createSale,
  getSaleById,
  getSales,
  updateSale,
} from "../controllers/sales.js";

const salesRouter = Router();

salesRouter.get("/", getSales);
salesRouter.get("/:id", getSaleById);
salesRouter.post("/", createSale);
salesRouter.put("/:id", updateSale);

export default salesRouter;
