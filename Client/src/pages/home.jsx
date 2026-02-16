/* This is responsible for rendering all components */

// Custom context hook that exposes global todo actions
import { useTodoContext } from "../context/todoContext";
//Import all components
import AddTodo from "../components/AddToDo/AddTodo";
import TodoList from "../components/ToDoList/TodoList";
import Filter from "../components/Filter/Filter";

export default function Home() {
  //Local state for todo, managing loading + errors
  const { todos, loading, error } = useTodoContext();

  //rendered UI with header and all components
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="content-card col-lg-8">
          {/* ---------------- HEADER ---------------- */}
          <header className="d-flex justify-content-center align-items-center mb-4">
            <div>
              <h1 className="h3 mb-1">Plan my task</h1>
              <p className="text-muted mb-0">Plan and execute.</p>
            </div>
          </header>

          {/* ---------------- ADD TODO FORM ---------------- */}
          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <AddTodo />
            </div>
          </div>

          {/* ---------------- FILTER + SORT CONTROLS ---------------- */}
          <Filter />

          {loading && <p className="text-muted">Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          {/* ---------------- TODO LIST ---------------- */}
          {!loading && !error && <TodoList todos={todos} />}
        </div>
      </div>
    </div>
  );
}
