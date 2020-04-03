const dotenv = require('dotenv');
dotenv.config({ silent: true });

module.exports = JSON.parse(process.env.CONFIG);
