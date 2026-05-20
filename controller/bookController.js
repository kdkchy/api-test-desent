const express = require('express');
const { sendError, sendSuccess } = require('../infra/response/defaultResponse');
const bookService = require('../services/bookService');

const router = express.Router();

router.post('/', (req, res) => {
  const result = bookService.createBook(req.body);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return sendSuccess(res, result.data, 'Book created', 201);
});

router.get('/', (req, res) => {
  const books = bookService.getBooks();

  return sendSuccess(res, books, 'Books retrieved');
});

router.get('/:id', (req, res) => {
  const result = bookService.getBookById(req.params.id);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return sendSuccess(res, result.data, 'Book retrieved');
});

router.put('/:id', (req, res) => {
  const result = bookService.updateBook(req.params.id, req.body);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return sendSuccess(res, result.data, 'Book updated');
});

router.delete('/:id', (req, res) => {
  const result = bookService.deleteBook(req.params.id);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return sendSuccess(res, result.data, 'Book deleted');
});

module.exports = router;
