const bookRepo = require('../repo/bookRepo');

const createBook = (body) => {
  const payload = body || {};
  const title = typeof payload.title === 'string' ? payload.title.trim() : '';
  const author = typeof payload.author === 'string' ? payload.author.trim() : null;
  const year = payload.year;

  if (!title) {
    return {
      error: {
        message: 'Title is required',
        statusCode: 400,
      },
    };
  }

  return {
    data: bookRepo.createBook({
      title,
      author: author || null,
      year,
    }),
  };
};

const deleteBook = (idParam) => {
  const idResult = parseBookId(idParam);

  if (idResult.error) {
    return idResult;
  }

  const deleted = bookRepo.deleteBook(idResult.id);

  if (!deleted) {
    return {
      error: {
        message: 'Book not found',
        statusCode: 404,
      },
    };
  }

  return {
    data: null,
  };
};

const getBooks = () => {
  return bookRepo.getBooks();
};

const getBookById = (idParam) => {
  const idResult = parseBookId(idParam);

  if (idResult.error) {
    return idResult;
  }

  const book = bookRepo.getBookById(idResult.id);

  if (!book) {
    return {
      error: {
        message: 'Book not found',
        statusCode: 404,
      },
    };
  }

  return {
    data: book,
  };
};

const parseBookId = (idParam) => {
  const id = Number(idParam);

  if (!Number.isInteger(id) || id < 1) {
    return {
      error: {
        message: 'Invalid book id',
        statusCode: 400,
      },
    };
  }

  return { id };
};

const updateBook = (idParam, body) => {
  const idResult = parseBookId(idParam);

  if (idResult.error) {
    return idResult;
  }

  const payload = body || {};
  const title = typeof payload.title === 'string' ? payload.title.trim() : '';
  const author = typeof payload.author === 'string' ? payload.author.trim() : null;
  const year = payload.year;

  if (!title) {
    return {
      error: {
        message: 'Title is required',
        statusCode: 400,
      },
    };
  }

  const book = bookRepo.updateBook(idResult.id, {
    title,
    author: author || null,
    year,
  });

  if (!book) {
    return {
      error: {
        message: 'Book not found',
        statusCode: 404,
      },
    };
  }

  return {
    data: book,
  };
};

module.exports = {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook,
};
