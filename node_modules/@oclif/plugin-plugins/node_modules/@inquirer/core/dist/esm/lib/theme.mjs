import chalk from 'chalk';
import spinners from 'cli-spinners';
export const defaultTheme = {
    prefix: chalk.green('?'),
    spinner: {
        interval: spinners.dots.interval,
        frames: spinners.dots.frames.map((frame) => chalk.yellow(frame)),
    },
    style: {
        answer: chalk.cyan,
        message: chalk.bold,
        error: (text) => chalk.red(`> ${text}`),
        defaultAnswer: (text) => chalk.dim(`(${text})`),
        help: chalk.dim,
        highlight: chalk.cyan,
        key: (text) => chalk.cyan.bold(`<${text}>`),
    },
};
