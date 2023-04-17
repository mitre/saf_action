const saf_action =  require('./run_command.js');
const path = require('node:path');

saf_action({safCLIPath: path.join(process.env.HOME, 'work/_actions/mitre/saf_action/main/node_modules/@mitre/saf/lib/index.js')});
