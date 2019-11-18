require('arraync');
const find = require('find-process');
const fs = require('fs');
const syscoin = require('@syscoin/syscoin-js');
const rp = require('request-promise');

const constants = require('./constants');
const config = require('./config');

const syscoinClient = new syscoin.SyscoinRpcClient({ host: config.syscoin.host, rpcPort: config.syscoin.port, username: config.syscoin.user, password: config.syscoin.pass});

async function checkProcessDown(mailer) {
  const processes = [constants.SYSETHEREUM_AGENT, constants.SYSCOIND, constants.SYSGETH, constants.SYSRELAYER];
  console.log('Checking process statuses');
  await processes.forEachAsync(async processName => {
    let list = await find('name', processName, false);
    if (list.length === 0) {
      let info;
      switch(processName) {
        default:
          info = await sendMail(mailer, require('./messages/agent_process_down'));
          console.log('info', info);
          break;
      }
      console.log(`${processName.toUpperCase()} DOWN! Sending email. ${info}`);
      process.exit(0);
    } else {
      console.log(`${list.length} running ${processName}, no action needed.`);
    }
  });
}

async function sendMail(mailer, message) {
  console.log('sendmail');
  try {
    let info = await mailer.sendMail(message);
    console.log('sendmail result', info);
  } catch (e) {
    console.log(e);
  }
}

function writeFile(fileName, content) {
  fs.writeFileSync('uptime.tmp', content, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Uptime saved!');
  });
}

function readFile(fileName) {
  try {
    return fs.readFileSync(fileName, 'utf8');
  } catch (e) {
    return null;
  }
}

async function getLocalSyscoinChainData() {
  try {
    return await syscoinClient.callRpc("getchaintips", []).call();
  }catch(e) {
    console.log("ERR getChainTips", JSON.stringify(e.response.data.error));
  }
}

async function getRemoteSyscoinChainData() {
  const options = {
    uri: `${config.explorer_url}/ext/getchaintips`,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  };

  return await rp(options);
}

async function checkForCorrectChain(mailer) {
  let local = await getLocalSyscoinChainData();
  let remote = await getRemoteSyscoinChainData();

  // find active chains
  local = local.find(el => el.status === 'active');
  remote = remote.find(el => el.status === 'active');

  if(local.height !== remote.height || local.hash !== remote.hash) {
    console.log('Chain mismatch');
    console.log('Local chain:', local);
    console.log('Remote chain:', remote);
    //await sendMail(mailer, require('./messages/agent_sys_chain_mismatch'));
    process.exit(0);
  } else {
    console.log('Chain height and hash match.');
  }
}

function configMailer(config) {
  let result = {
    host: config.smtp.host,
    secure: config.smtp.secure,
    port: config.smtp.port
  };

  // if we have non-empty auth, use it
  if(config.smtp.auth.user !== '' && config.smtp.auth.pass !== '') {
    result.auth = config.smtp.auth
  }

  // if not secure
  if(!config.smtp.secure) {
    result.tls = {
      rejectUnauthorized: false
    }
  }

  return result;
}

module.exports = {
  checkProcessDown,
  writeFile,
  readFile,
  sendMail,
  getLocalSyscoinChainData,
  getRemoteSyscoinChainData,
  checkForCorrectChain,
  configMailer
};
