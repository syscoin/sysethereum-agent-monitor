const config = require(`../config`);

module.exports = {
  subject: `${config.agent_id} SYSETH INFO: Agent ETH chain has fallen behind`,
  text: `THE AGENT IS ATTEMPTING TO BE AUTO RESTARTED. NO ACTION REQUIRED YET.\n\n The ETH blockchain on ${config.agent_id} is behind the infura blockchain by at least ${config.eth_block_threshold}. Action may be required!\n Local: {{local}} \n Remote: {{remote}}`,
  html: `<p><b>THE AGENT IS ATTEMPTING TO BE AUTO RESTARTED. NO ACTION REQUIRED YET.</b></p>
         <p>The ETH blockchain on ${config.agent_id} is behind the infura blockchain by at least ${config.eth_block_threshold}. Action may be required!</p>
         <p><b>Local chain:</b> {{local}}</p>
         <p><b>Remote chain:</b> {{remote}}</p>`
};
