const config = require('../config');

module.exports = {
  to: config.notify_address,
  subject: 'ACTION REQUIRED: Agent host machine restarted',
  text: 'The agent host machine has been restarted. Action may be required!',
  html: '<p>The agent host machine has been restarted. Action may be required!</p>'
};
