/* This file contains helper function(s)*/

//helper function to check whether todo is overdue 
export function isOverdue(todo) {
  if (!todo.due_date) return false;
  if (todo.completed) return false;

  const today = new Date().toISOString().split("T")[0];
  return todo.due_date < today;
}
