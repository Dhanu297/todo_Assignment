
// SQLite core driver 
import sqlite3 from "sqlite3";
import { open } from "sqlite";

//Initializes and returns a SQLite database connection.
export async function initDB() {
  return open({
    filename: "./db/database.sqlite",
    driver: sqlite3.Database
  });
}