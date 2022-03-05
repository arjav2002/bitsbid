const Dotenv = require('dotenv-webpack');

module.exports = {
  plugins: [
    new Dotenv()
  ],
  env: {
    SERVER_IP: process.env.SERVER_IP,
    PORT: process.env.PORT
  }
};