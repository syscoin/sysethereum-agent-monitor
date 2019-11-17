
# agent-monitor  
  
A javascript service for monitoring critical [sysethereum-agents](https://github.com/syscoin/sysethereum-agents) process and details and pushing email alerts  
in the case of errors or issues so that operators can take actions on their agent.  

The service monitors several aspects of agent operation:
 - Verifies `syscoind`, `sysrelayer.nod`, `sysgeth.nod`, and `sysethereum-agents` processes are running.
 - Verifies local chain data matches remote chain data provided by `explorer_url`.
 - Alerts agent operators anytime the host machine restarts
  
## Installation  
  
`npm i`  
  
## Configuration   
Edit `config.json` to configure the monitor for your environment.   
  
**Config Parameters:**  
`interval` - (seconds) how often to check system statuses.  
`smtp.host` - SMTP host.  
`smtp.auth.user` - SMTP username, leave blank for no auth.  
`smtp.auth.pass` - SMTP password, leave blank for no auth.  
`smtp.port` - SMTP server port.  
`syscoin.host` - Syscoin RPC host.  
`syscoin.user` - Syscoin RPC username.  
`syscoin.pass` - Syscoin RPC password.  
`syscoin.port` - Syscoin RPC port.  
`explorer_url` - URL to Syscoin block explorer that utilizes [BCF Explorer API](https://github.com/blockchainfoundryinc/explorer). No trailing slash.  
  
## Usage 
It is recommended you configure the `agent-monitor` to start when the machine restarts in order to be alerts of unexpected restarts. For more information on setting up `agent-monitor` to start automatically on reboot read [the PM2 docs.](https://pm2.keymetrics.io/docs/usage/startup/)

After configuration: `npm start`.  
  
*Note*:  If the service detects an alert condition it will exit to avoid spam emails.

## Contributing  
  
Please submit all updates and improvements via pull request.
