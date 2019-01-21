import { createConnection, ConnectionOptions, Connection } from 'typeorm';

import logging from './utils/logging';

const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'test';
const database = isTesting
    ? String(process.env.MYSQL_DATABASE_TEST)
    : String(process.env.MYSQL_DATABASE);

const connectionOptions: ConnectionOptions = {
    database,
    type: 'mysql',
    maxQueryExecutionTime: 800,
    entities: ['src/entities/*.ts'],
    host: String(process.env.MYSQL_HOST),
    port: Number(process.env.MYSQL_PORT),
    username: String(process.env.MYSQL_USER),
    password: String(process.env.MYSQL_PASSWORD),
    logging: !isProduction && !isTesting,
    synchronize: false,
};

let connection: Connection;

export async function openDatabaseConnection() {
    try {
        connection = await createConnection(connectionOptions);

        console.info('=> DB successfully connected');
    } catch (err) {
        logging.error(err);
        console.error('Error in db connection: ', err);

        process.exit(1);
    }
}

export async function closeDatabaseConnection() {
    if (isConnected()) {
        try {
            await connection.close();
        } catch (err) {
            logging.error(err);
            console.error('Error in db connection close: ', err);

            process.exit(1);
        }
    } else {
        throw new Error('Database is not connected!');
    }
}

export function isConnected() {
    return connection.isConnected;
}
