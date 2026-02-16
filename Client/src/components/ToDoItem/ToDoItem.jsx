/* TODO Item Componnent and its methods */

// React state hook for managing form inputs
import { useState } from "react";

// Custom context hook that exposes global todo actions like add , update etc
import { useTodoContext } from "../../context/todoContext";

// Utility function that checks whether a todo is overdue
import { isOverdue } from "../../utils/dateHelper";

//TODO Item related styles
import "./ToDoItem.css";

export default function TodoItem({ todo }) {
  // Extract global state and actions from context.
  // toggleTodo = marks a todo as completed/uncompleted, deleteTodo = removes a todo
  // editTodo = updates the title , editDueDate = updates the due date
  const { toggleTodo, deleteTodo, editTodo, editDueDate } = useTodoContext();

  //Local UI state for editing mode. isEditing, value (title) and due date.
  //These are kept local because they only matter to UI, not to the global todo state until the user submits.
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(todo.title);
  const [dueDate, setDueDate] = useState(todo.due_date || "");

  //Save edits made to the todo.
  const saveEdit = () => {
    //Prevents empty titles
    if (!value.trim()) return;

    //Updates title
    editTodo(todo.id, value);

    //Updates duedate
    editDueDate(todo.id, dueDate);

    //Exits editing mode after saving
    setIsEditing(false);
  };

  // Derived values

  const completed = !!todo.completed;
  const overdue = isOverdue(todo);

  //EDIT MODE UI
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

  //DEFAULT VIEW MODE UI
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
                  overdue
                    ? "badge badge-overdue due-date"
                    : "badge badge-due due-date"
                }
              >
                {overdue ? "Overdue: " : "Due: "}
                {todo.due_date}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* edit + delete buttons */}
      <div className="d-flex align-items-center gap-1">
        {/* on click of edit button UI enters in edit mode */}

        <button
          className="icon-btn task-action-btn"
          type="button"
          onClick={() => setIsEditing(true)}
          aria-label="Edit"
        >
          <i className="bi bi-pencil"></i>
        </button>
        {/* on click of delete button, it deletes todo */}

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
