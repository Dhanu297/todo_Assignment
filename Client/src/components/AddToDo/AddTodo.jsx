/* Add TODO and respective methods */

// React state hook for managing form inputs
import { useState } from "react";
// Custom context hook that exposes global todo actions like add , update etc
import { useTodoContext } from "../../context/todoContext";

export default function AddTodo() {
  // Local component state for controlled inputs title and duedate
  //These are kept local because they only matter to this form, not to the global todo state until the user submits.

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  //Extract the addTodo function from global context
  const { addTodo } = useTodoContext();

  // Handle form submission.

  const handleSubmit = (e) => {
    //Prevents default page reload

    e.preventDefault();

    //Validates that title is not empty
    if (!title.trim()) return;

    // Trigger global addTodo (which handles API + state updates)
    addTodo(title, dueDate);
    // Reset form fields
    setTitle("");
    setDueDate("");
  };
  //Input form containing title, due date inputs and  add task button
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
