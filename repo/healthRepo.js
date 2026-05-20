const { getDatabase } = require('../infra/db');

const getDatabaseHealth = () => {
  const db = getDatabase();
  const row = db.prepare('SELECT sqlite_version() AS version').get();

  return {
    engine: 'sqlite',
    connected: true,
    version: row.version,
  };
};

module.exports = {
  getDatabaseHealth,
};
