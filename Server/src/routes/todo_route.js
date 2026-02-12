import express from "express";
import { validateTodo } from "../middleware/todo.js";
import { validateTitle } from "../middleware/todo.js";

export default function todoRoutes(controller) {
  const router = express.Router();

  router.get("/", controller.getAll);
  router.post("/", validateTodo, controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);
router.put("/:id/title", validateTitle, controller.updateTitle);
router.put("/:id/due-date", controller.updateDueDate);
  return router;
}