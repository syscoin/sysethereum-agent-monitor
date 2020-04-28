const { execSync } = require('child_process');
const config = require('./config');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
};

run = async () => {
  try {
    console.log('Stopping syscoind');
    const syskill = execSync('syscoin-cli stop');

    // wait for sys to shut down
    await sleep(3000);

    console.log(`Stopping screens: ${config.agent_process}`);
    try {
      const syseth = execSync(`screen -XS ${config.agent_process} quit`);
    } catch (e) {
      console.log("ERROR: problem stopping screens. Are they running?");
      console.log(e);
      process.exit(0);
    }

    // now restart syscoind
    console.log('Starting syscoind');
    const sysup = execSync('syscoind');

    // now restart sysethagent, in a screen
    console.log('Starting sysethagent');
    const sysethup = execSync('screen -S sysethagent ./start_agent.sh');

  } catch (e) {
    console.log('Error: ', e);
    //console.log('Stderr: ', e.stderr);
    //console.log('Stdout: ', e.stdout);

    return e;
  }
};

run();

