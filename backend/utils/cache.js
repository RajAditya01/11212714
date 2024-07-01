const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const getCache = (key) => {
  return cache.get(key);
};

const setCache = (key, value) => {
  cache.set(key, value);
};

module.exports = {
  getCache,
  setCache,
};
