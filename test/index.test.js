const path = require('path');

describe('SAF Action tests', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  it('should run SAF with a space topic separator in the command string', async () => {
    let inputFilePath = path.resolve('./test/sample_data/red_hat_good.json');
    process.env['INPUT_COMMAND_STRING'] = `view summary -i ${inputFilePath}`;
    require('../index.js');
    await new Promise((r) => setTimeout(r, 1000));
    delete process.env['INPUT_COMMAND_STRING'];
  });
  it('should run SAF with a semicolon topic separator in the command string', async () => {
    let inputFilePath = path.resolve('./test/sample_data/red_hat_good.json');
    process.env['INPUT_COMMAND_STRING'] = `view:summary -i ${inputFilePath}`;
    require('../index.js');
    await new Promise((r) => setTimeout(r, 1000));
    delete process.env['INPUT_COMMAND_STRING'];
  });
});