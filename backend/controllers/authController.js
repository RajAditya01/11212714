const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const response = await authService.register(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAuthToken = async (req, res) => {
  try {
    const response = await authService.getAuthToken(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
