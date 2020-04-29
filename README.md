
# sysethereum-agent-monitor  
  
A javascript service for monitoring critical [sysethereum-agents](https://github.com/syscoin/sysethereum-agents) process and details and pushing email alerts  
in the case of errors or issues so that operators can take actions on their agent. This service exposes a REST endpoint
at `http://ip:[port]/status` for integration with external monitoring systems. 

The service monitors several aspects of agent operation:
 - Verifies `syscoind`, `sysrelayer.nod`, `sysgeth.nod`, and `sysethereum-agents` processes are running.
 - Verifies local Syscoin and Ethereum chain data matches remote chain data provided by `explorer_url` using data from `getchaintips` RPC.
 - Alerts agent operators anytime the host machine restarts
 
This service can automatically restart all critical sysethereum agent processes if an error is detected. If automatic restart 
fails the service will notify operators for further inspection.
  
## Installation  
  
`npm i`  
  
## Configuration   
Use `config.json.template` to configure the monitor for your environment. This tool uses 
https://github.com/blockchainfoundryinc/setenv for simplified configuration. 

*To complete configuration you must run `CONF_JSON=config.json.template npm run setenv`.*
  
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
`notify_address` - Email address to which notifications will be sent.
`sender_email` - Email address from which notifications will be sent.
`port` - Port the HTTP server will run on for `/status`.
`enable_mail` - Enable email alerts.
`email_retry_minutes` - Amount of time in minutes to wait between nag email alerts when critical services are down.
`enable_autorestart` - Enable autorestart functionality. 
`agent_process` - Screen session name to run the sysethereum-agent process under (this tool uses `screen`)  
  
## Usage 
It is recommended you configure the `sysethereum-agent-monitor` to start when the machine restarts in order to be alerts 
of unexpected restarts. For more information on setting up `sysethereum-agent-monitor` to start automatically 
on reboot read [the PM2 docs.](https://pm2.keymetrics.io/docs/usage/startup/)

After configuration: `npm start`.  
  
*Note*:  If the service detects an alert condition it will exit to avoid spam emails.

## Testing Mailer Settings
For convenience there is a script for testing mail settings after you've completed configuration. To test mail settings run the below, passing a valid email as `[toaddress]`:

`npm run mailtest [toaddress]` 

## Contributing  
  
Please submit all updates and improvements via pull request.
