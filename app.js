const express = require('express');
const { sendError } = require('./infra/response/defaultResponse');
const authController = require('./controller/authController');
const bookController = require('./controller/bookController');
const healthController = require('./controller/healthController');

const port = process.env.PORT || 3000;

const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use('/', healthController);
  app.use('/auth', authController);
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

const app = createApp();

if (require.main === module) {
  app.listen(port, (error) => {
    if (error) {
      console.error(`Failed to start API on port ${port}: ${error.message}`);
      process.exit(1);
    }

    console.log(`API listening on port ${port}`);
  });
}

module.exports = app;
module.exports.createApp = createApp;
