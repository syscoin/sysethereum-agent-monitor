require('arraync');
const find = require('find-process'),
  fs = require('fs'),
  syscoin = require('@syscoin/syscoin-js'),
  rp = require('request-promise');
const constants = require('./constants'),
  config = require('./config');
const syscoinClient = new syscoin.SyscoinRpcClient({ host: config.syscoin.host, rpcPort: config.syscoin.port, username: config.syscoin.user, password: config.syscoin.pass});

async function checkProcessDown(mailer) {
  const processes = [constants.SYSETHEREUM_AGENT, constants.SYSCOIND, constants.SYSGETH, constants.SYSRELAYER];
  console.log('Checking process statuses');
  await processes.forEachAsync(async process => {
    let list = await find('name', process, false);
    if (list.length === 0) {
      console.log(`${process.toUpperCase()} DOWN! Sending email.`);
      switch(process) {
        case constants.SYSETHEREUM_AGENT:
          await sendMail(mailer, require('./message_agent_process_down'));
          break;

        default:
          break;
      }
      process.exit(0);
    } else {
      console.log(`${list.length} running ${process}, no action needed.`);
    }
  });
}

async function sendMail(mailer, message) {
  return await mailer.sendMail(message);
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

module.exports = {
  checkProcessDown,
  writeFile,
  readFile,
  sendMail,
  getLocalSyscoinChainData,
  getRemoteSyscoinChainData,
  checkForCorrectChain
};
