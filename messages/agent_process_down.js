const config = require(`../config`);

module.exports = {
  subject: `${config.agent_id} SYSETH INFO: Agent process down`,
  text: `THE AGENT IS ATTEMPTING TO BE AUTO RESTARTED. NO ACTION REQUIRED YET.\n\n The agent process on ${config.agent_id} has stopped running. Action may be required!`,
  html: `<p><b>THE AGENT IS ATTEMPTING TO BE AUTO RESTARTED. NO ACTION REQUIRED YET.</b></p>
         <p>The agent process on ${config.agent_id} has stopped running. Action may be required!</p>`
};
