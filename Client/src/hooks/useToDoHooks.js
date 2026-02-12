import { useEffect, useState } from "react";
import { TodoAPI } from "../api/todoAPI";

/**
 * useTodos(sortBy)
 * -----------------
 * A custom hook that manages:
 * - fetching todos from the backend
 * - sorting todos based on the current sort mode
 * - CRUD operations (add, edit, delete, toggle)
 * - loading and error states
 *
 * The hook re-sorts todos automatically whenever `sortBy` changes.
 */

export function useTodos(sortBy) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function sortTodos(list, sortBy) {
    const sorted = [...list];

    if (sortBy === "due_date") {
      return sorted.sort((a, b) => {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return a.due_date.localeCompare(b.due_date);
      });
    }

    if (sortBy === "title") {
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === "status") {
      return sorted.sort((a, b) => a.completed - b.completed);
    }

    return sorted;
  }

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await TodoAPI.getAll();

      // FIXED
      setTodos(sortTodos(res.data, sortBy));
    } catch {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (title, due_date) => {
    try {
      const res = await TodoAPI.create(title, due_date);

      // FIXED
      setTodos((prev) => sortTodos([...prev, res.data], sortBy));
    } catch {
      setError("Failed to add todo");
    }
  };

  const editTodo = async (id, title) => {
    try {
      await TodoAPI.updateTitle(id, title);

      // FIXED
      setTodos((prev) =>
        sortTodos(
          prev.map((t) => (t.id === id ? { ...t, title } : t)),
          sortBy
        )
      );
    } catch {
      setError("Failed to edit todo");
    }
  };

  const editDueDate = async (id, due_date) => {
    try {
      await TodoAPI.updateDueDate(id, due_date);

      // FIXED
      setTodos((prev) =>
        sortTodos(
          prev.map((t) => (t.id === id ? { ...t, due_date } : t)),
          sortBy
        )
      );
    } catch {
      setError("Failed to update due date");
    }
  };

  const toggleTodo = async (id, completed) => {
    try {
      await TodoAPI.updateStatus(id, completed);

      // FIXED
      setTodos((prev) =>
        sortTodos(
          prev.map((t) => (t.id === id ? { ...t, completed } : t)),
          sortBy
        )
      );
    } catch {
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await TodoAPI.delete(id);

      // FIXED
      setTodos((prev) =>
        sortTodos(prev.filter((t) => t.id !== id), sortBy)
      );
    } catch {
      setError("Failed to delete todo");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    setTodos((prev) => sortTodos(prev, sortBy));
  }, [sortBy]);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    editTodo,
    editDueDate,
    deleteTodo
  };
}