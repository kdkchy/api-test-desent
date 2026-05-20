const express = require('express');
const { sendError } = require('./infra/response/defaultResponse');
const { initializeDatabase } = require('./infra/db');
const bookController = require('./controller/bookController');
const healthController = require('./controller/healthController');

const port = process.env.PORT || 3000;

const createApp = () => {
  initializeDatabase();

  const app = express();

  app.use(express.json());

  app.use('/', healthController);
  app.use('/books', bookController);

  app.use((req, res) => {
    sendError(res, 'Route not found', 404);
  });

  app.use((error, req, res, next) => {
    console.error(error);
    sendError(res, 'Internal server error', 500);
  });

  return app;
};

if (require.main === module) {
  const app = createApp();

  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
}

module.exports = createApp;
