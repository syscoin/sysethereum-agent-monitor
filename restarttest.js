const exec = require('exec-sh').promise;

run = async () => {
  // switch to screen with monitor
  const pkill = await exec('pkill screen');
  const sysstop = await exec('syscoin-cli stop');
  console.log(pkill, sysstop);
}

run();

