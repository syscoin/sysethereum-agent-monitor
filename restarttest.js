const { execSync } = require('child_process');

run = async () => {
  try {
    console.log('Stopping all screens.');
    const pkill = execSync('screen -XS agenttest quit');
    console.log('out', pkill);
    Object.values(pkill.output).forEach(item => {
      if (!item) return;
      const decoded = item.toString('utf8');
      if (decoded && decoded !== '')
      console.log("ITEMS:", decoded);
    });


    //console.log('Stopping syscoind');
    //const sysstop = await exec('syscoin-cli stop');
    //console.log('out: ', sysstop.stdout, sysstop.stderr);
    //
    //console.log("Results:");
    //console.log(pkill, sysstop);
  } catch (e) {
    console.log('Error: ', e);
    console.log('Stderr: ', e.stderr);
    console.log('Stdout: ', e.stdout);

    return e;
  }
};

run();

