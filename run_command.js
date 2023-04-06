const {resolve} = require('path');
const core = require('@actions/core');
const saf = require('@mitre/saf');

/**
 * Runs the provided 'command string' against the SAF CLI
 *
 * @param {Object} [options]
 * @param {string} [options.overrideCommand] - the command to run if one is not provided via environment variable
 * @param {string} [options.safCLIPath] - the path to the entrypoint of the SAF CLI
 * @return {Promise<unknown>} The result of running a command against an oclif cli tool
 */
async function runCommand({overrideCommand, safCLIPath}) {
    const command_string = core.getInput('command_string') || overrideCommand;
    if (!command_string) {
        throw new Error("SAF CLI Command String argument is required.");
    }

    const saf_command = command_string.split(' ');

    const allowable_topics = ['convert', 'generate', 'harden', 'scan', 'validate', 'view'];
    const topic = saf_command[0].includes(':') ? saf_command[0].split(':')[0] : saf_command[0];

    if (!allowable_topics.includes(topic)) {
        throw new Error("The command string did not include one of the allowable topics: " + allowable_topics.join(', ') + ". Please reference the documentation for more details.");
    }

    const command = saf_command[0].includes(':') ? saf_command[0].split(':')[1] : saf_command[1];

    if (topic === "view" && command === "heimdall") {
        throw new Error("The SAF Action does not support the 'view heimdall' command. Please reference the documentation for other uses.");
    }

    return saf.run(saf_command, resolve(safCLIPath));
}

module.exports = runCommand
