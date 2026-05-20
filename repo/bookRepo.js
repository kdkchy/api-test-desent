const { getDatabase } = require('../infra/db');

const createBook = ({ title, author = null }) => {
  const db = getDatabase();
  const result = db
    .prepare('INSERT INTO books (title, author) VALUES (?, ?)')
    .run(title, author);

  return getBookById(Number(result.lastInsertRowid));
};

const getBooks = () => {
  const db = getDatabase();

  return db
    .prepare(
      `
      SELECT id, title, author, created_at, updated_at
      FROM books
      ORDER BY id ASC
      `,
    )
    .all();
};

const getBookById = (id) => {
  const db = getDatabase();

  return db
    .prepare(
      `
      SELECT id, title, author, created_at, updated_at
      FROM books
      WHERE id = ?
      `,
    )
    .get(id);
};

const updateBook = (id, { title, author = null }) => {
  const db = getDatabase();
  const result = db
    .prepare(
      `
      UPDATE books
      SET title = ?, author = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
    )
    .run(title, author, id);

  if (result.changes === 0) {
    return null;
  }

  return getBookById(id);
};

const deleteBook = (id) => {
  const db = getDatabase();
  const result = db.prepare('DELETE FROM books WHERE id = ?').run(id);

  return result.changes > 0;
};

module.exports = {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
};
