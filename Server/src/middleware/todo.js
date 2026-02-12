export function validateTodo(req, res, next) {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }
  next();
}
export function validateTitle(req, res, next) {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title cannot be empty" });
  }
  next();
}