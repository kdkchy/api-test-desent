const getStorageHealth = () => {
  return {
    engine: 'memory',
    connected: true,
    persistent: false,
  };
};

module.exports = {
  getStorageHealth,
};
