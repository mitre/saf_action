import { describe, it } from 'vitest';
const path = require('path');
const saf_action =  require('../run_command.js');

describe('SAF Action tests', () => {
  it('should run SAF with a space topic separator in the command string', async () => {
    let inputFilePath = path.resolve('./test/sample_data/red_hat_good.json');
    process.env['INPUT_COMMAND_STRING'] = `view summary -i ${inputFilePath}`;
    await saf_action({safCLIPath: "./node_modules/@mitre/saf/lib/index.js"});
    delete process.env['INPUT_COMMAND_STRING'];
  });
  it('should run SAF with a colon topic separator in the command string', async () => {
    let inputFilePath = path.resolve('./test/sample_data/red_hat_good.json');
    process.env['INPUT_COMMAND_STRING'] = `view:summary -i ${inputFilePath}`;
    await saf_action({safCLIPath: "./node_modules/@mitre/saf/lib/index.js"});
    delete process.env['INPUT_COMMAND_STRING'];
  });
});
