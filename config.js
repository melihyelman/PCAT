const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  password: process.env.API_PASSWORD,
};
