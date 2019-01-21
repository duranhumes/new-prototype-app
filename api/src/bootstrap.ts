import 'dotenv-safe/config';
import 'reflect-metadata';
import { createServer } from 'http';
import { statSync, mkdirSync } from 'fs';
import { normalize, join, resolve } from 'path';

import logging from './utils/logging';
import { openDatabaseConnection } from './database';

const port = Number(process.env.APP_PORT);

let httpServer = createServer();
async function main() {
    const logsDir = normalize(join(resolve(__dirname, '..'), 'logs'));
    try {
        statSync(logsDir);
    } catch (e) {
        mkdirSync(logsDir);
    }

    await openDatabaseConnection();

    // Start server
    setImmediate(() => {
        const app = require('./server').default;
        app.set('port', port);
        httpServer = createServer(app);
        httpServer.listen(port);
        httpServer.on('error', onError);
        console.info(
            `\n=> ${process.env.APP_NAME} is ready for use on port ${port} <=`
        );
    });
}

function onError(error: NodeJS.ErrnoException): void {
    console.error('Error in Index: ', error);

    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            closeServer();
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            closeServer();
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function closeServer() {
    httpServer.close();
}

process.on(
    'uncaughtException',
    (exception: NodeJS.ErrnoException): void => {
        logging.error(exception);
        console.error('uncaughtException: ', exception);
        closeServer();

        process.exit(1);
    }
);

process.on(
    'unhandledRejection',
    (reason: any, promise: any): void => {
        logging.error({ promise, reason });
        console.error('unhandledRejection: ', promise, ' reason: ', reason);
        closeServer();

        process.exit(1);
    }
);

// Clean up on nodemon restarts
process.once('SIGUSR2', () => {
    process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', () => {
    closeServer();
    process.exit(0);
});

process.on('SIGTERM', () => {
    closeServer();
    process.exit(0);
});

export default main;
