const config = require('../config');

module.exports = {
  to: config.notify_address,
  subject: 'ACTION REQUIRED: Agent process down',
  text: 'The agent process on the target machine has stopped running. Action may be required!',
  html: '<p>The agent process on the target machine has stopped running. Action may be required!</p>'
};
