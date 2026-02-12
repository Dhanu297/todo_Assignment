import TodoItem from "../ToDoItem/ToDoItem";
import { useTodoContext } from "../../context/todoContext";
import { isOverdue } from "../../utils/dateHelper";

export default function TodoList() {
  const { todos, filter } = useTodoContext();   // ✅ hook INSIDE component

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    if (filter === "overdue") return isOverdue(todo);
    return true;
  });

  if (filteredTodos.length === 0) {
    return <p className="text-center text-muted">No tasks found.</p>;
  }

  return (
    <ul className="list-group">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}