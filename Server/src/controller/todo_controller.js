export default class TodoController {
  constructor(todoService) {
    this.todoService = todoService;
  }

  getAll = async (req, res, next) => {
    try {
      const todos = await this.todoService.getAll();
      res.json(todos);
    } catch (err) {
      next(err);
    }
  };

 create = async (req, res, next) => {
  try {
    const { title, due_date } = req.body;
    const todo = await this.todoService.create(title, due_date);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};


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
