const { execSync } = require('child_process');

run = async () => {
  try {
    console.log('Stopping syscoind');
    const syskill = execSync('syscoin-cli stop');

    console.log('Stopping screens.');
    const syseth = execSync('screen -XS agenttest quit');

    // now restart syscoind
    console.log('Starting syscoind');
    const sysup = execSync('syscoind');

    // now restart sysethagent, in a screen
    console.log('Starting sysethagent');
    const sysup = execSync('screen -S sysethagent ./start_agent.sh');

  } catch (e) {
    console.log('Error: ', e);
    console.log('Stderr: ', e.stderr);
    console.log('Stdout: ', e.stdout);

    return e;
  }
};

run();

