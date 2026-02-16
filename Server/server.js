// Core Express framework for building the HTTP server
import express from "express";

//Enables Cross-Origin Resource Sharing so your React frontend running on  different domain can communicate with this API
import cors from "cors";

// Import dotenv so we can load environment variables from a .env file
import dotenv from "dotenv";

// Load all variables defined in the .env file into process.env
dotenv.config();

// Initializes and returns a SQLite database connection
import { initDB } from "./src/database.js";

// Service layer: contains business logic for todos
import TodoService from "./src/services/todo_service.js";

// Controller layer: handles HTTP request/response logic
import TodoController from "./src/controller/todo_controller.js";

// Route definitions: maps endpoints to controller methods
import todoRoutes from "./src/routes/todo_route.js";

// Global error handler middleware for catching unhandled errors
import { errorHandler } from "./src/middleware/error_handler.js";

const app = express();

//CORS middleware to allow your React app to communicate with the server.
app.use(cors());

// Middleware: allows frontend to send JSON bodies
app.use(express.json());

//get port from envrronment variables or 5000
const PORT = process.env.PORT ? process.env.PORT : 5000;

const start = async () => {
  // Open SQLite database connection
  const db = await initDB();

  //Create the todos table if it doesn't already exist.

  await db.exec(`   
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    due_date TEXT
  );
`);

  // Instantiate service layer with DB dependency
  const todoService = new TodoService(db);

  // Instantiate controller layer with service dependency
  const todoController = new TodoController(todoService);

  // Register all todo-related routes under /api/todos
  app.use("/api/todos", todoRoutes(todoController));

  // Global error handler (must be registered after all routes)
  app.use(errorHandler);

  // Start the HTTP server
  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
};

start();
