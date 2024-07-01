const axios = require('axios');

const registerWithTestServer = async () => {
  try {
    const response = await axios.post('https://test-server.com/register', {
      // registration details
    });
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

registerWithTestServer().then(data => console.log(data));
