const healthRepo = require('../repo/healthRepo');

const getHealth = () => {
  return {
    service: 'api_test',
    database: healthRepo.getDatabaseHealth(),
  };
};

const getPing = () => {
  return {
    pong: true,
  };
};

const getEcho = (body) => {
  return body;
};

module.exports = {
  getEcho,
  getHealth,
  getPing,
};
