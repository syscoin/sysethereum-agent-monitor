const exec = require('exec-sh').promise;

run = async () => {
  // switch to screen with monitor
  await exec('pkill screen');
  await exec('syscoin-cli stop');
}

