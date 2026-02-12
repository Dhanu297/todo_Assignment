export default class TodoService {
  constructor(db) {
    this.db = db;
  }

  async getAll() {
    return this.db.all("SELECT * FROM todos");
  }

 async create(title, due_date) {
  const result = await this.db.run(
    "INSERT INTO todos (title, completed, due_date) VALUES (?, ?, ?)",
    [title, 0, due_date]
  );

  return { id: result.lastID, title, completed: 0, due_date };
}
async updateDueDate(id, due_date) {
  await this.db.run(
    "UPDATE todos SET due_date = ? WHERE id = ?",
    [due_date, id]
  );
  return { id, due_date };
}
  async update(id, completed) {
    await this.db.run(
      "UPDATE todos SET completed = ? WHERE id = ?",
      [completed ? 1 : 0, id]
    );
    return { id, completed };
  }
  async updateTitle(id, title) {
  await this.db.run(
    "UPDATE todos SET title = ? WHERE id = ?",
    [title, id]
  );
  return { id, title };
}

  async delete(id) {
    await this.db.run("DELETE FROM todos WHERE id = ?", [id]);
    return { id };
  }
}