import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (req, res) => {
  console.log("hello");
});
usersRouter.get("/:id", (req, res) => {});
usersRouter.post("/", (req, res) => {});
usersRouter.put("/:id", (req, res) => {});
usersRouter.delete("/:id", (req, res) => {});

export default usersRouter;
