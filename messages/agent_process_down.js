const config = require(`../config`);

module.exports = {
  subject: `${config.agent_id} ACTION REQUIRED: Agent process down`,
  text: `The agent process on ${config.agent_id} has stopped running. Action may be required!`,
  html: `<p>The agent process on ${config.agent_id} has stopped running. Action may be required!</p>`
};
