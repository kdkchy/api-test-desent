const express = require('express');
const { sendSuccess } = require('../infra/response/defaultResponse');
const healthService = require('../services/healthService');

const router = express.Router();

router.get('/', (req, res) => {
  const health = healthService.getHealth();

  return sendSuccess(res, health, 'API is running');
});

router.get('/ping', (req, res) => {
  const ping = healthService.getPing();

  return sendSuccess(res, ping, 'Pong');
});

router.post('/echo', (req, res) => {
  const echo = healthService.getEcho(req.body);

  return sendSuccess(res, echo, 'Echo');
});

module.exports = router;
