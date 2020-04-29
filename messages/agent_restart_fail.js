const config = require(`../config`);

module.exports = {
  subject: `${config.agent_id} SYSETH ACTION REQUIRED: Agent restart FAILED`,
  text: `Automated restart of this agent FAILED successful. Humans will be needed to fix the problem.`,
  html: `<p><b>Automated restart of this agent FAILED successful. Humans will be needed to fix the problem.</b></p>`
};
