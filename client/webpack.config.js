const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv()
  ],
  env: {
    SERVER_IP: process.env.REACT_APP_SERVER_IP,
    PORT: process.env.REACT_APP_PORT,
    CLIENT_ID: process.env.REACT_APP_CLIENT_ID
  }
};