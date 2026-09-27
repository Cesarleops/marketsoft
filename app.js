import express from "express";
import productsRouter from "./routes/products.js";
import providersRouter from "./routes/providers.js";
import usersRouter from "./routes/users.js";
import salesRouter from "./routes/sales.js";

export const app = express();

app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/providers", providersRouter);
app.use("/api/sales", salesRouter);
