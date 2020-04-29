const config = require(`../config`);

module.exports = {
  subject: `${config.agent_id} ACTION REQUIRED: Agent process down`,
  text: `Syscoind or the sysethagent process on ${config.agent_id} has stopped running. Action may be required!`,
  html: `<p>syscoind or the sysethagent process on ${config.agent_id} has stopped running. Action may be required!</p>`
};
