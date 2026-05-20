const express = require('express');
const { sendError } = require('../infra/response/defaultResponse');
const bookService = require('../services/bookService');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', (req, res) => {
  const result = bookService.createBook(req.body);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return res.status(201).json(result.data);
});

router.get('/', requireAuth, (req, res) => {
  const result = bookService.getBooks(req.query);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return res.status(200).json(result.data);
});

router.get('/:id', (req, res) => {
  const result = bookService.getBookById(req.params.id);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return res.status(200).json(result.data);
});

router.put('/:id', (req, res) => {
  const result = bookService.updateBook(req.params.id, req.body);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return res.status(200).json(result.data);
});

router.delete('/:id', (req, res) => {
  const result = bookService.deleteBook(req.params.id);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return res.status(204).send();
});

module.exports = router;
