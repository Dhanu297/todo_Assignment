/* TODO List Componnent - Rendering a list of todos + filter logic  and its methods */
//import todo item
import TodoItem from "../ToDoItem/ToDoItem";

// Custom context hook that exposes global todo actions like add , update etc
import { useTodoContext } from "../../context/todoContext";

// Utility function that checks whether a todo is overdue
import { isOverdue } from "../../utils/dateHelper";

export default function TodoList() {
  
  //Extract todos and the current filter from global context.
  const { todos, filter } = useTodoContext();   //  hook INSIDE component

  //Depending on the status apply filter 
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    if (filter === "overdue") return isOverdue(todo);
    return true;
  });

  //When there is no todo list will be shown as empty
  if (filteredTodos.length === 0) {
    return <p className="text-center text-muted">No tasks found.</p>;
  }

//Render the filtered list of todos.
  return (
    <ul className="list-group">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}