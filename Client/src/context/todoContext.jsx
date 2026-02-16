import { createContext, useContext, useState } from "react";
import { useTodos } from "../hooks/useToDoHooks";

// Create a global context for sharing todo state and actions
const TodoContext = createContext(null);

export function TodoProvider({ children }) {
  // Local component state for filter
  // FILTER STATE: all, active, completed, overdue
  const [filter, setFilter] = useState("all");

  // Local component state for sort by field
  //SORT STATE: due_date, title, status
  const [sortBy, setSortBy] = useState("due_date");

  // hooks - fetches todos from backend, sorts ,do CRUD operations, manage loading and errorstates

  const {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    editTodo,
    editDueDate,
    deleteTodo,
  } = useTodos(sortBy);

  //Maintain state throughout the app and Any component can access these via useTodoContext().

  return (
    <TodoContext.Provider
      value={{
        todos, // sorted list of todos
        loading, // loading state for initial fetch
        error, // error message if API fails
        addTodo, // create a new todo
        toggleTodo, // toggle completion status
        editTodo, // update title
        editDueDate, // update due date
        deleteTodo, // remove todo
        filter, // current filter mode
        setFilter, // update filter mode
        sortBy, // current sort mode
        setSortBy, // update sort mode
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook to safely access the TodoContext.

export function useTodoContext() {
  const ctx = useContext(TodoContext);
  if (!ctx) {
    throw new Error("useTodoContext must be used inside <TodoProvider>");
  }
  return ctx;
}
