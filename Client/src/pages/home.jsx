import {useTodoContext} from "../context/todoContext"
import AddTodo from "../components/AddToDo/AddTodo";
import TodoList from "../components/ToDoList/TodoList";
import Filter from "../components/Filter/Filter";

export default function Home() {
  const { todos, loading, error } = useTodoContext();

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="content-card col-lg-8">

          <header className="d-flex justify-content-center align-items-center mb-4">
            <div>
              <h1 className="h3 mb-1">My Tasks</h1>
              <p className="text-muted mb-0">Plan, prioritize, and execute.</p>
            </div>
          </header>

          <div className="card shadow-sm mb-3">
            <div className="card-body">
              <AddTodo />
            </div>
          </div>

          <Filter />

          {loading && <p className="text-muted">Loading...</p>}
          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && <TodoList todos={todos} />}
        </div>
      </div>
    </div>
  );
}