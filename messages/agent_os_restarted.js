const config = require('../config');

module.exports = {
  to: config.notify_address,
  subject: `${config.agent_id} ACTION REQUIRED: Agent restarted`,
  text: `The agent id ${config.agent_id} has been restarted. Action may be required!`,
  html: `<p>The agent id ${config.agent_id} has been restarted. Action may be required!</p>`
};
