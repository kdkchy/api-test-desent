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

const getBooks = (query = {}) => {
  const author = typeof query.author === 'string' ? query.author.trim() : null;
  const pageResult = parsePositiveIntegerQuery(query.page, 'page');

  if (pageResult.error) {
    return pageResult;
  }

  const limitResult = parsePositiveIntegerQuery(query.limit, 'limit');

  if (limitResult.error) {
    return limitResult;
  }

  const page = pageResult.value;
  const limit = limitResult.value;

  if ((page === null && limit !== null) || (page !== null && limit === null)) {
    return {
      error: {
        message: 'Both page and limit are required for pagination',
        statusCode: 400,
      },
    };
  }

  return {
    data: bookRepo.getBooks({
      author: author || null,
      page,
      limit,
    }),
  };
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

const parsePositiveIntegerQuery = (value, name) => {
  if (value === undefined) {
    return { value: null };
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return {
      error: {
        message: `${name} must be a positive integer`,
        statusCode: 400,
      },
    };
  }

  return { value: parsed };
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
