const books = [
  {
    id: 1,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt',
    year: 1999,
    created_at: '2026-05-20T00:00:00.000Z',
    updated_at: '2026-05-20T00:00:00.000Z',
  },
  {
    id: 2,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    year: 2008,
    created_at: '2026-05-20T00:00:00.000Z',
    updated_at: '2026-05-20T00:00:00.000Z',
  },
  {
    id: 3,
    title: 'Refactoring',
    author: 'Martin Fowler',
    year: 1999,
    created_at: '2026-05-20T00:00:00.000Z',
    updated_at: '2026-05-20T00:00:00.000Z',
  },
];
let nextBookId = 4;

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

const getBooks = ({ author = null, page = null, limit = null } = {}) => {
  let results = books;

  if (author) {
    const normalizedAuthor = author.toLowerCase();
    results = results.filter((book) => {
      return typeof book.author === 'string' && book.author.toLowerCase().includes(normalizedAuthor);
    });
  }

  if (page !== null && limit !== null) {
    const start = (page - 1) * limit;
    results = results.slice(start, start + limit);
  }

  return results.map(cloneBook);
};

const getBookById = (id) => {
  const book = books.find((item) => item.id === id);

  return book ? cloneBook(book) : undefined;
};

const updateBook = (id, { title, author = null, year = null }) => {
  const book = books.find((item) => item.id === id);

  if (!book) {
    return null;
  }

  book.title = title;
  book.author = author;
  book.year = year;
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
