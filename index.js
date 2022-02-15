const core = require('@actions/core');
const saf = require('@mitre/saf');

const command_string = core.getInput('command_string');
if(!command_string) {
    throw new Error("SAF CLI Command String argument is required.");
}

if(command_string.split(" ")[0] == "view:heimdall") {
    throw new Error("The SAF Action does not support the 'view:heimdall' command. Please reference the documentation for other uses.");
}

saf.run(command_string.split(" "));