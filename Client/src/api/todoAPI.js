import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/todos"
});

export const TodoAPI = {
  getAll: () => api.get("/"),

  create: (title, due_date) =>
    api.post("/", { title, due_date }),

  updateStatus: (id, completed) =>
    api.put(`/${id}`, { completed }),

  updateTitle: (id, title) =>
    api.put(`/${id}/title`, { title }),

  updateDueDate: (id, due_date) =>
    api.put(`/${id}/due-date`, { due_date }),

  delete: (id) =>
    api.delete(`/${id}`)
};