/* This is Middleware for validating */

//This function checks whether the todo is valid
export function validateTodo(req, res, next) {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  next();
}

//This function checks whether the title is valid
export function validateTitle(req, res, next) {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title cannot be empty" });
  }
  next();
}
