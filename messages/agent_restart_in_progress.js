const config = require(`../config`);

module.exports = {
  subject: `${config.agent_id} SYSETH INFO: One or more agent errors`,
  text: `THE AGENT IS ATTEMPTING TO BE AUTO RESTARTED. NO ACTION REQUIRED YET.\\n You will receive another email with the restart status shortly.`,
  html: `<p><b>THE AGENT IS ATTEMPTING TO BE AUTO RESTARTED. NO ACTION REQUIRED YET.</b></p>
         <p>You will receive another email with the restart status shortly.</p>`
};
