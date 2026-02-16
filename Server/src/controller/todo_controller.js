/* This controller handles all incoming HTTP requests related to todos. It delegates business logic to the TodoService,
 keeping controllers thin and focused on request/response.*/


export default class TodoController {
  constructor(todoService) {

    // Inject service dependency (promotes testability + modularity)
    this.todoService = todoService;
  }

  /* ApI call:  GET /api/todos   
    Fetch all todos from the database.
  */

  getAll = async (req, res, next) => {
    try {
      const todos = await this.todoService.getAll();
      res.json(todos);
    } catch (err) {
      next(err); // Pass error to global error handler
    }
  };

 /* ApI call: POST /api/todos
   Create a new todo. Expects: { title, due_date }  */
 create = async (req, res, next) => {
  try {
    const { title, due_date } = req.body;
    const todo = await this.todoService.create(title, due_date);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

/* ApI call: PUT /api/todos/:id
  Update only the status (i.e value of completed) of a todo. Expects: completed  */
  update = async (req, res, next) => {
    try {
      const { completed } = req.body;
      const { id } = req.params;
      const updated = await this.todoService.update(id, completed);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

/* ApI call: PUT /api/todos/:id/title
  Update only the title of a todo. Expects: title */
updateTitle = async (req, res, next) => {
  try {
    const { title } = req.body;
    const { id } = req.params;

    const updated = await this.todoService.updateTitle(id, title);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/* ApI call: PUT /api/todos/:id/due-date
  Update only the due-date of a todo. Expects: due-date */
updateDueDate = async (req, res, next) => {
  try {
    const { due_date } = req.body;
    const { id } = req.params;

    const updated = await this.todoService.updateDueDate(id, due_date);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/* ApI call: DELETE /api/todos/:id
   Delete a todo by ID */
  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleted = await this.todoService.delete(id);
      res.json(deleted);
    } catch (err) {
      next(err);
    }
  };
}
