const config = require(`../config`);

module.exports = {
  to: config.notify_address,
  subject: `${config.agent_id} ACTION REQUIRED: Agent blockchain mismatch`,
  text: `The blockchain on ${config.agent_id} is not matching the remote explorer blockchain. Action may be required!\n Local: {{local}} \n Remote: {{remote}}`,
  html: `<p>The blockchain on ${config.agent_id} is not matching the remote explorer blockchain. Action may be required!</p>
         <p><b>Local chain:</b> {{local}}</p>
         <p><b>Remote chain:</b> {{remote}}</p>`
};
