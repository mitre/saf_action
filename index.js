const saf_action =  require('./run_command.js');
const path = require('node:path');

console.log("what is this path");
console.log(path.join(process.env.HOME, 'work/_actions/', process.env.GITHUB_ACTION_REPOSITORY, process.env.GITHUB_ACTION_REF, 'node_modules/@mitre/saf/lib/index.js'));
saf_action({safCLIPath: path.join(process.env.HOME, 'work/_actions/', process.env.GITHUB_ACTION_REPOSITORY, process.env.GITHUB_ACTION_REF, 'node_modules/@mitre/saf/lib/index.js')});
