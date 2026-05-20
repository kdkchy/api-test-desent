const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const databasePath = path.join(__dirname, 'app.sqlite');
let database;

const getDatabase = () => {
  if (!database) {
    database = new DatabaseSync(databasePath);
    database.exec('PRAGMA foreign_keys = ON');
  }

  return database;
};

const initializeDatabase = () => {
  const db = getDatabase();

  db.exec(`
    CREATE TABLE IF NOT EXISTS app_metadata (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
};

const closeDatabase = () => {
  if (database) {
    database.close();
    database = undefined;
  }
};

module.exports = {
  closeDatabase,
  getDatabase,
  initializeDatabase,
};
