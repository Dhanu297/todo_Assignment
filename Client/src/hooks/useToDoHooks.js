// React hooks for managing local state + side effects
import { useEffect, useState } from "react";

// Centralized API layer for all Todo CRUD operations
import { TodoAPI } from "../api/todoAPI";

export function useTodos(sortBy) {
  // Local state for todos and fetching them from backend
  const [todos, setTodos] = useState([]);
  // Local state for Managing loading + error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Sorting todos based on the active sort option
  function sortTodos(list, sortBy) {
    const sorted = [...list];

    //Sorting by due_date
    if (sortBy === "due_date") {
      return sorted.sort((a, b) => {
        if (!a.due_date) return 1; // items without due dates go last
        if (!b.due_date) return -1;
        return a.due_date.localeCompare(b.due_date);
      });
    }

    //Sorting by title
    if (sortBy === "title") {
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    //Sorting by status
    if (sortBy === "status") {
      return sorted.sort((a, b) => a.completed - b.completed);
    }

    return sorted;
  }

  //Loads todos from the backend API. & apply sorting on data
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await TodoAPI.getAll();

      setTodos(sortTodos(res.data, sortBy));
    } catch {
      setError("Failed to load todos");
    } finally {
      setLoading(false);
    }
  };

  //Creates a new todo via API and updates local state.
  const addTodo = async (title, due_date) => {
    try {
      const res = await TodoAPI.create(title, due_date);

      // FIXED
      setTodos((prev) => sortTodos([...prev, res.data], sortBy));
    } catch {
      setError("Failed to add todo");
    }
  };

  //Updates only the title of a todo.
  const editTodo = async (id, title) => {
    try {
      await TodoAPI.updateTitle(id, title);

      setTodos((prev) =>
        sortTodos(
          prev.map((t) => (t.id === id ? { ...t, title } : t)),
          sortBy,
        ),
      );
    } catch {
      setError("Failed to edit todo");
    }
  };

  //Updates only the due date of a todo.
  const editDueDate = async (id, due_date) => {
    try {
      await TodoAPI.updateDueDate(id, due_date);

      // FIXED
      setTodos((prev) =>
        sortTodos(
          prev.map((t) => (t.id === id ? { ...t, due_date } : t)),
          sortBy,
        ),
      );
    } catch {
      setError("Failed to update due date");
    }
  };

  //Toggles completion status (0 or 1).
  const toggleTodo = async (id, completed) => {
    try {
      await TodoAPI.updateStatus(id, completed);

      setTodos((prev) =>
        sortTodos(
          prev.map((t) => (t.id === id ? { ...t, completed } : t)),
          sortBy,
        ),
      );
    } catch {
      setError("Failed to update todo");
    }
  };

  //Removes a todo from backend + local state.
  const deleteTodo = async (id) => {
    try {
      await TodoAPI.delete(id);

      // FIXED
      setTodos((prev) =>
        sortTodos(
          prev.filter((t) => t.id !== id),
          sortBy,
        ),
      );
    } catch {
      setError("Failed to delete todo");
    }
  };

  //Initial load: fetch todos once when component mounts.
  useEffect(() => {
    fetchTodos();
  }, []);

  //Re-sort todos whenever the sort option changes. This avoids refetching
  useEffect(() => {
    setTodos((prev) => sortTodos(prev, sortBy));
  }, [sortBy]);

  // Expose state + CRUD operations to components
  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    editTodo,
    editDueDate,
    deleteTodo,
  };
}
