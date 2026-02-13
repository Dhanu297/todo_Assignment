import { useState } from "react";
import { useTodoContext } from "../../context/todoContext";
import { isOverdue } from "../../utils/dateHelper";
import "./ToDoItem.css"

export default function TodoItem({ todo }) {
  const { toggleTodo, deleteTodo, editTodo, editDueDate } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const [dueDate, setDueDate] = useState(todo.due_date || "");

  const saveEdit = () => {
    if (!value.trim()) return;
    editTodo(todo.id, value);
    editDueDate(todo.id, dueDate);
    setIsEditing(false);
  };

  const completed = !!todo.completed;
  const overdue = isOverdue(todo);

  if (isEditing) {
    return (
      <li className="todo-card task-item">
        <div className="row g-2 align-items-center">
          <div className="col-md-6">
            <input
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Task title"
            />
          </div>
          <div className="col-md-4">
            <input
              type="date"
              className="form-control due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="col-md-2 d-flex justify-content-end gap-2">
            <button className="btn btn-sm btn-success" onClick={saveEdit}>
              Save
            </button>
            <button
              className="btn btn-sm btn-outline-secondary "
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className="todo-card d-flex justify-content-between align-items-start gap-3">
      <div className="d-flex gap-2 align-items-start">
        <input
          type="checkbox"
          className="form-check-input mt-1"
          checked={completed}
          onChange={() => toggleTodo(todo.id, completed ? 0 : 1)}
        />
        <div>
          <div className="d-flex align-items-center gap-2">
            <span className={`todo-title ${completed ? "completed" : ""}`}>
              {todo.title}
            </span>
            {completed && (
              <i className="bi bi-check-circle-fill text-success small"></i>
            )}
          </div>
          <div className="todo-meta mt-1 d-flex flex-wrap gap-2 align-items-center ">
            {todo.due_date && (
              <span
                className={
                  overdue ? "badge badge-overdue due-date" : "badge badge-due due-date"
                }
              >
                {overdue ? "Overdue: " : "Due: "}
                {todo.due_date}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex align-items-center gap-1">
        <button
          className="icon-btn task-action-btn"
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label="Edit"
        >
          <i className="bi bi-pencil"></i>
        </button>
        <button
          className="icon-btn task-action-btn"
          type="button"
          onClick={() => deleteTodo(todo.id)}
          aria-label="Delete"
        >
          <i className="bi bi-trash text-danger"></i>
        </button>
      </div>
    </li>
  );
}

