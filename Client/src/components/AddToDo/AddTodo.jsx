import { useState } from "react";
import { useTodoContext } from "../../context/todoContext";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTodo } = useTodoContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title, dueDate);
    setTitle("");
    setDueDate("");
  };

   return (
    <form onSubmit={handleSubmit} className="row g-2 mb-4">
      <div className="col-md-6">
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
        />
      </div>

      <div className="col-md-4">
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="col-md-2 d-grid">
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
