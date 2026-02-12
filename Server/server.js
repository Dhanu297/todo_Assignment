import express from "express";
import cors from "cors";
import { initDB } from "./src/database.js";
import TodoService from "./src/services/todo_service.js";
import TodoController from "./src/controller/todo_controller.js";
import todoRoutes from "./src/routes/todo_route.js";
import { errorHandler } from "./src/middleware/error_handler.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const start = async () => {
  const db = await initDB();

  await db.exec(`
   
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    due_date TEXT
  );
`);

  const todoService = new TodoService(db);
  const todoController = new TodoController(todoService);

  app.use("/api/todos", todoRoutes(todoController));

  app.use(errorHandler);

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
};

start();