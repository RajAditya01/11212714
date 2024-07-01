const axios = require('axios');
const { testServerBaseUrl } = require('../config');

exports.register = async (data) => {
  const response = await axios.post(`${testServerBaseUrl}/register`, data);
  return response.data;
};

exports.getAuthToken = async (data) => {
  const response = await axios.post(`${testServerBaseUrl}/auth`, data);
  return response.data;
};
