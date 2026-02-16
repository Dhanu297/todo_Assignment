/* Filter Componnent and its methods */

// Custom context hook that exposes global todo actions get todos, filter, sorting, setters
import { useTodoContext } from "../../context/todoContext";

// Utility function that checks whether a todo is overdue
import { isOverdue } from "../../utils/dateHelper";

// Component‑specific styles
import "./Filter.css";

export default function Filter() {
  // Extract global state and actions from context.
  // todos = full list of todos, filter = current active filter ("all", "active", "completed", "overdue")
  // setFilter = updates the active filter , sortBy = current sorting key ("due_date", "title", "status")
  // setSortBy → updates the sorting key

  const { todos, filter, setFilter, sortBy, setSortBy } = useTodoContext();

  //Pre‑computed counts for each filter category.

  const allCount = todos.length;
  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;
  const overdueCount = todos.filter((t) => isOverdue(t)).length;

  //UI for Filter
  return (
    <section className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
      {/* ---------------- FILTER BUTTONS ---------------- */}

      <div className="filter-container">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          🔵 All: {allCount}
        </button>

        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          🟢 Active: {activeCount}
        </button>

        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          ⚪ Completed: {completedCount}
        </button>

        <button
          className={filter === "overdue" ? "active" : ""}
          onClick={() => setFilter("overdue")}
        >
          🔴 Overdue: {overdueCount}
        </button>
      </div>

      {/* ---------------- SORT DROPDOWN ---------------- */}
      <div className="dropdown ">
        <button
          className="btn btn-sm  dropdown-toggle sort-dropdown"
          data-bs-toggle="dropdown"
        >
          Sort by:{" "}
          {{
            due_date: "Due Date",
            title: "Title",
            status: "Status",
          }[sortBy] || "Due Date"}
        </button>

        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <button
              className="dropdown-item"
              onClick={() => setSortBy("due_date")}
            >
              Due Date
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => setSortBy("title")}
            >
              Title
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => setSortBy("status")}
            >
              Status
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
}
