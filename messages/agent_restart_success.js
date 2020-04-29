const config = require(`../config`);

module.exports = {
  subject: `${config.agent_id} SYSETH INFO: Agent restart success`,
  text: `Automated restart of this agent was successful. No further action needed.`,
  html: `<p>Automated restart of this agent was successful. No further action needed.</p>`
};
