const config = require(`../config`);

module.exports = {
  to: config.notify_address,
  subject: `${config.agent_id} ACTION REQUIRED: Agent ETH chain has fallen behind`,
  text: `The ETH blockchain on ${config.agent_id} is behind the infura blockchain by at least ${config.eth_block_threshold}. Action may be required!\n Local: {{local}} \n Remote: {{remote}}`,
  html: `<p>The ETH blockchain on ${config.agent_id} is behind the infura blockchain by at least ${config.eth_block_threshold}. Action may be required!</p>
         <p><b>Local chain:</b> {{local}}</p>
         <p><b>Remote chain:</b> {{remote}}</p>`
};
