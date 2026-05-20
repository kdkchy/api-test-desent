const books = [];
let nextBookId = 1;

const getTimestamp = () => new Date().toISOString();

const cloneBook = (book) => ({ ...book });

const createBook = ({ title, author = null, year = null }) => {
  const now = getTimestamp();
  const book = {
    id: nextBookId,
    title,
    author,
    year,
    created_at: now,
    updated_at: now,
  };

  nextBookId += 1;
  books.push(book);

  return cloneBook(book);
};

const getBooks = () => {
  return books.map(cloneBook);
};

const getBookById = (id) => {
  const book = books.find((item) => item.id === id);

  return book ? cloneBook(book) : undefined;
};

const updateBook = (id, { title, author = null }) => {
  const book = books.find((item) => item.id === id);

  if (!book) {
    return null;
  }

  book.title = title;
  book.author = author;
  book.updated_at = getTimestamp();

  return cloneBook(book);
};

const deleteBook = (id) => {
  const index = books.findIndex((item) => item.id === id);

  if (index === -1) {
    return false;
  }

  books.splice(index, 1);
  return true;
};

module.exports = {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
};
