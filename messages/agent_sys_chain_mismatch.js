const config = require('../config');

module.exports = {
  to: config.notify_address,
  subject: 'ACTION REQUIRED: Agent blockchain mismatch',
  text: 'The agent blockchain is not matching the remote explorer blockchain. Action may be required!',
  html: '<p>The agent blockchain is not matching the remote explorer blockchain. Action may be required!</p>'
};
