const { spawnSync} = require('child_process');

run = async () => {
  try {
    console.log('Stopping all screens.');
    const pkill = spawnSync('screen', ['-list']);
    console.log('out: ', pkill, Object.values(pkill.output).forEach(item => {
      console.log(JSON.stringify(item, 'utf8'));
    }));


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

