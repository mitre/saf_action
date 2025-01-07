const saf_action =  require('./run_command.js');
const path = require('node:path');

console.log("what is this path");
console.log(process.env.HOME);
console.log(process.env.GITHUB_ACTION_REPOSITORY);
console.log(process.env.GITHUB_ACTION_REF);
console.log(process.env.GITHUB_ACTION_PATH); // apparently we're not a composite action
console.log(process.env.GITHUB_WORKSPACE);
// console.log(path.join(process.env.GITHUB_WORKSPACE, '..', 'node_modules/@mitre/saf/lib/index.js'));
console.log(path.join(process.env.GITHUB_WORKSPACE, '../..', '_actions/', process.env.GITHUB_ACTION_REPOSITORY, process.env.GITHUB_ACTION_REF, 'node_modules/@mitre/saf/lib/index.js'));

const execSync = require('child_process').execSync;
const output = execSync(`tree ${path.join(process.env.GITHUB_WORKSPACE, '../..', '_actions/', process.env.GITHUB_ACTION_REPOSITORY, process.env.GITHUB_ACTION_REF, 'node_modules/@mitre/saf/lib/index.js')}`, { encoding: 'utf-8' });
console.log(output);

// console.log(path.join(process.env.HOME, 'work/_actions/', process.env.GITHUB_ACTION_REPOSITORY, process.env.GITHUB_ACTION_REF, 'node_modules/@mitre/saf/lib/index.js'));
saf_action({safCLIPath: path.join(process.env.GITHUB_WORKSPACE, '../..', '_actions/', process.env.GITHUB_ACTION_REPOSITORY, process.env.GITHUB_ACTION_REF, 'node_modules/@mitre/saf/lib/index.js')});
