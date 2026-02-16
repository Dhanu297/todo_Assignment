// Express router for defining REST API endpoints
import express from "express";

// Validation middleware for incoming request bodies
import { validateTodo } from "../middleware/todo.js";
import { validateTitle } from "../middleware/todo.js";

export default function todoRoutes(controller) {
  const router = express.Router();
  /* GET /api/todos Function: Fetch all todos.  */
  router.get("/", controller.getAll);
  /* POST /api/todos Function: Create a new todo  */
  router.post("/", validateTodo, controller.create);
  /* PUT /api/todos/:id Function: Update only the "completed" status of a todo. */
  router.put("/:id", controller.update);
  /* DELETE /api/todos/:id Function: Remove a todo by ID. */
  router.delete("/:id", controller.delete);
  /* PUT /api/todos/:id/title Function: Update only title of a todo. */
  router.put("/:id/title", validateTitle, controller.updateTitle);
  /* PUT /api/todos/:id/due-date Function: Update only due-date of a todo. */
  router.put("/:id/due-date", controller.updateDueDate);
  return router;
}
