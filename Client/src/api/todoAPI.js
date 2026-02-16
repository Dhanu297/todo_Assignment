/* Creating and managing API methods */
// Import Axios for making HTTP requests
import axios from "axios";
// Base URL for the backend API.
// This comes from environment variables (Client/.env).
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create a reusable Axios instance. All requests will use this base URL which avoids repeating full url

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/todos`,
});

// Export all Todo API functions in a single object. Each function returns a Promise from Axios.

export const TodoAPI = {
  // Fetch all todos
  getAll: () => api.get("/"),

  // Create a new todo with title + due date
  create: (title, due_date) => api.post("/", { title, due_date }),

  // Update only the "completed" status of a todo
  updateStatus: (id, completed) => api.put(`/${id}`, { completed }),

  // Update only the title of a todo
  updateTitle: (id, title) => api.put(`/${id}/title`, { title }),

  // Update only the due date of a todo
  updateDueDate: (id, due_date) => api.put(`/${id}/due-date`, { due_date }),

  // Delete a todo by ID
  delete: (id) => api.delete(`/${id}`),
};
