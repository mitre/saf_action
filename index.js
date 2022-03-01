const core = require('@actions/core');
const saf = require('@mitre/saf');

const command_string = core.getInput('command_string');
if(!command_string) {
    throw new Error("SAF CLI Command String argument is required.");
}

const allowable_commands = ['convert', 'generate', 'harden', 'scan', 'validate', 'view'];
if(!allowable_commands.includes(command_string.split(':')[0])) {
    throw new Error("The command string did not include one of the allowable commands: " + allowable_commands.join(', ') + ". Please reference the documentation for more details.");
}

if(command_string.split(" ")[0] == "view:heimdall") {
    throw new Error("The SAF Action does not support the 'view:heimdall' command. Please reference the documentation for other uses.");
}

saf.run(command_string.split(" "));