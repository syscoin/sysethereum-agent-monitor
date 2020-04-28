const { execSync } = require('child_process');
const config = require('./config');

const sleep = (seconds) => {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
};


const stopSys = async () => {
  console.log('Stopping syscoind');
  const syskill = execSync('syscoin-cli stop');

  // wait for sys to shut down
  return await sleep(5);
};

const stopSysEthAgent = async () => {
  console.log(`Stopping screens: ${config.agent_process}`);
  try {
    const syseth = execSync(`screen -XS ${config.agent_process} quit`);
  } catch (e) {
    console.log("ERROR: problem stopping screens. Are they running?");
    console.log(e);
    process.exit(0);
  }
};

const startAll = async () => {
  // now restart sysethagent and syscoind, in a screen
  console.log('Starting syscoind + sysethagent');
  const sysethup = execSync('screen -S sysethagent ./start_agent.sh');
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

