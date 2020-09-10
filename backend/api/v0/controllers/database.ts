import { Request, Response } from 'express'
import * as log from '../utils/logger';
import { Client } from 'pg';

const section = 'Controllers | Database |'

const DB = process.env.DB || 'postgres';
const DB_USER = process.env.DB_USER || 'database-user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';

const client = new Client(`postgres://${DB_USER}:${DB_PASSWORD}@db:5432/${DB}`);
client.connect(error => {
    if (error) {
        log.error({ component: section, message: error.stack!, error });
    } else {
        log.info({ component: section, message: 'Connected to Database' });
    }
});

export async function createTable(req: Request, res: Response) {
    const component = log.component(`${section} createTable`)
    client.query(`CREATE TABLE ${req.params.table} (id SERIAL PRIMARY KEY, name text, age integer);`,
        (error, result) => {
            if (error) {
                log.error({ component, message: error.message.replace(/\"/g, "'"), error });
                return res.status(401).send({
                    error: true,
                    message: error.message.replace(/\"/g, "'"),
                    object: {}
                });
            }
            const message = `table '${req.params.table}' was created.`
            log.info({ component, message });
            res.status(201).send({
                error: false,
                message,
                object: {}
            });
        })
}

export async function deleteTable(req: Request, res: Response) {
    const component = `${section} deleteTable`
    client.query(`DROP TABLE ${req.params.table};`,
        (error, result) => {
            if (error) {
                log.error({ component, message: error.message.replace(/\"/g, "'"), error });
                return res.status(401).send({
                    error: true,
                    message: error.message.replace(/\"/g, "'"),
                    object: {}
                });
            }
            const message = `table '${req.params.table}' was deleted.`
            log.info({ component, message });
            res.status(201).send({
                error: false,
                message,
                object: {}
            });
        })
}

export async function addRow(req: Request, res: Response) {
    const component = `${section} addRow`
    client.query(`INSERT INTO ${req.params.table}(name, age) VALUES ('Jaime', 25) RETURNING *;`,
        (error, result) => {
            if (error) {
                log.error({ component, message: error.message.replace(/\"/g, "'"), error });
                return res.status(401).send({
                    error: true,
                    message: error.message.replace(/\"/g, "'"),
                    object: {}
                });
            }
            const insertedValue = result?.rows[0]
            if (insertedValue.name !== 'Jaime'
                || insertedValue.age != 25) {
                return res.status(500).send({
                    error: true,
                    message: `Error! | Inseted Value: ${insertedValue}`,
                    object: {}
                });
            }
            res.status(201).send({
                error: false,
                message: '',
                object: insertedValue
            });
        })
}

export async function getAll(req: Request, res: Response) {
    const component = `${section} getAll`
    client.query(`SELECT * FROM ${req.params.table};`,
        (error, result) => {
            if (error) {
                log.error({ component, message: error.message.replace(/\"/g, "'"), error });
                return res.status(404).send({
                    error: true,
                    message: error.message.replace(/\"/g, "'"),
                    object: {}
                });
            }
            res.status(200).json({
                error: false,
                message: '',
                object: result?.rows
            });
        })
}
