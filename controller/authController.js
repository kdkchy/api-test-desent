const express = require('express');
const { sendError } = require('../infra/response/defaultResponse');
const authService = require('../services/authService');

const router = express.Router();

router.post('/token', (req, res) => {
  const result = authService.createTokenForCredentials(req.body);

  if (result.error) {
    return sendError(res, result.error.message, result.error.statusCode);
  }

  return res.status(200).json(result.data);
});

module.exports = router;
