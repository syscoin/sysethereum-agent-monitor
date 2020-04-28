const { execSync } = require('child_process');
const config = require('./config');
const { SYSETHEREUM_AGENT } = require('./constants');
const find = require('find-process');

const sleep = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
};

const startSys = async () => {
  console.log('Starting syscoind');
  const sysup = execSync('syscoind');

  // wait for sys to start up
  return await sleep(5);
};

const stopSys = async () => {
  console.log('Stopping syscoind');
  const syskill = execSync('syscoin-cli stop');

  // wait for sys to shut down
  return await sleep(5);
};


const startSysEthAgent = async () => {
  try {
    const sysethup = execSync('screen -S sysethagent ./start_agent.sh');
  } catch (e) {
    console.log("ERROR: problem stopping screens. Are they running?");
    console.log(e);
    process.exit(0);
  }
};

const startAndMonitorSysEthAgent = async () => {
  console.log(`Starting sysethagent on screen named: ${config.agent_process}`);
  let sysEthUp = false;
  let count = 0;
  while(!sysEthUp) {
    await startSysEthAgent();
    console.log("Monitoring for agent up, attempt ", count);
    await sleep(5);

    let list = await find('name', SYSETHEREUM_AGENT, false);
    if (list.length === 1) {
      console.log(`Monitor: ${SYSETHEREUM_AGENT} is now UP`);
      sysEthUp = true;
    } else {
      console.log(`Monitor: ${SYSETHEREUM_AGENT} is STILL DOWN, waitng and trying again`);
    }

    count ++;
  }
};


const stopSysEthAgent = async () => {
  console.log(`Stopping screens: ${config.agent_process}`);
  try {
    const syseth = execSync(`screen -XS ${config.agent_process} quit`);
  } catch (e) {
    console.log("ERROR: problem stopping screens. Are they running?");
    //console.log(e);
  }
};

const startAll = async () => {
  // now restart sysethagent and syscoind, in a screen
  console.log('Starting syscoind + sysethagent');
  await startSys();
  await startAndMonitorSysEthAgent();
};

const stopAndRestart = async () => {
  try {
    await stopSys();
    await stopSysEthAgent();
    await startAll();

    // wait a sec before we return so that things can sync, etc, before the next alert check
    await sleep(10);

    return true;

  } catch (e) {
    console.log('Error: ', e);
    //console.log('Stderr: ', e.stderr);
    //console.log('Stdout: ', e.stdout);
    return false;
  }
};

module.exports = {
  stopAndRestart,
  stopSysEthAgent,
  stopSys,
  startAll
};

