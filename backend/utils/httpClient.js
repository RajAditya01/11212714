const axios = require('axios');

const httpClient = axios.create({
  baseURL: 'http://20.244.56.144/test',
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = httpClient;
