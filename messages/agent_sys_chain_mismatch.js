const config = require(`../config`);

module.exports = {
  subject: `${config.agent_id} SYSETH INFO: Agent blockchain mismatch`,
  text: `The blockchain on ${config.agent_id} is not matching the remote explorer blockchain. Action may be required!\n Local: {{local}} \n Remote: {{remote}}`,
  html: `<p><b>THE AGENT IS ATTEMPTING TO BE AUTO RESTARTED. NO ACTION REQUIRED YET.</b></p>
         <p>The blockchain on ${config.agent_id} is not matching the remote explorer blockchain. Action may be required!</p>
         <p><b>Local chain:</b> {{local}}</p>
         <p><b>Remote chain:</b> {{remote}}</p>`
};
