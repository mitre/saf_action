import { Errors, ux } from '@oclif/core';
import makeDebug from 'debug';
import { spawn as cpSpawn } from 'node:child_process';
import { npmRunPathEnv } from 'npm-run-path';
const debug = makeDebug('@oclif/plugin-plugins:spawn');
export async function spawn(modulePath, args = [], { cwd, logLevel }) {
    return new Promise((resolve, reject) => {
        // On windows, the global path to npm could be .cmd, .exe, or .js. If it's a .js file, we need to run it with node.
        if (process.platform === 'win32' && modulePath.endsWith('.js')) {
            args.unshift(`"${modulePath}"`);
            modulePath = 'node';
        }
        debug('modulePath', modulePath);
        debug('args', args);
        const spawned = cpSpawn(modulePath, args, {
            cwd,
            env: {
                ...npmRunPathEnv(),
                // Disable husky hooks because a plugin might be trying to install them, which will
                // break the install since the install location isn't a .git directory.
                HUSKY: '0',
            },
            stdio: 'pipe',
            windowsVerbatimArguments: true,
            ...(process.platform === 'win32' && modulePath.toLowerCase().endsWith('.cmd') && { shell: true }),
        });
        const possibleLastLinesOfNpmInstall = ['up to date', 'added'];
        const stderr = [];
        const stdout = [];
        const loggedStderr = [];
        const loggedStdout = [];
        const shouldPrint = (str) => {
            // For ux cleanliness purposes, don't print the final line of npm install output if
            // the log level is 'notice' and there's no other output.
            const noOtherOutput = loggedStderr.length === 0 && loggedStdout.length === 0;
            const isLastLine = possibleLastLinesOfNpmInstall.some((line) => str.startsWith(line));
            if (noOtherOutput && isLastLine && logLevel === 'notice') {
                return false;
            }
            return logLevel !== 'silent';
        };
        spawned.stderr?.setEncoding('utf8');
        spawned.stderr?.on('data', (d) => {
            const output = d.toString().trim();
            stderr.push(output);
            if (shouldPrint(output)) {
                loggedStderr.push(output);
                ux.stdout(output);
            }
            else
                debug(output);
        });
        spawned.stdout?.setEncoding('utf8');
        spawned.stdout?.on('data', (d) => {
            const output = d.toString().trim();
            stdout.push(output);
            if (shouldPrint(output)) {
                loggedStdout.push(output);
                ux.stdout(output);
            }
            else
                debug(output);
        });
        spawned.on('error', reject);
        spawned.on('exit', (code) => {
            if (code === 0) {
                resolve({ stderr, stdout });
            }
            else {
                reject(new Errors.CLIError(`${modulePath} ${args.join(' ')} exited with code ${code}`, {
                    suggestions: ['Run with DEBUG=@oclif/plugin-plugins* to see debug output.'],
                }));
            }
        });
    });
}
