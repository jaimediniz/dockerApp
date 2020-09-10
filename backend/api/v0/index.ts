import express from "express";
import * as log from './utils/logger';
import { Client } from 'pg';

const router = express.Router();

const DB = process.env.DB || 'postgres';
const DB_USER = process.env.DB_USER || 'database-user';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';

const client = new Client(`postgres://${DB_USER}:${DB_PASSWORD}@db:5432/${DB}`);
client.connect(err => {
    if (err) {
        console.error('connection error', err.stack);
    } else {
        console.log('connected');
    }
});

log.info({ component: 'Root', message: "Start route" })
router.get("/", (req, res) => res.json({ message: "Docker is easy 🐳" }));

router.get('/DBcreateTable', (req, res) => {
    client.query(`CREATE TABLE people (
        id SERIAL PRIMARY KEY,
        name text,
        age integer
        );INSERT INTO people(name, age)
        VALUES ('Jaime', 25) RETURNING *;`,
        (err, result) => {
            if (err) {
                return res.status(401).send({
                    error: true,
                    message: err.message.replace(/\"/g, "'")
                });
            }
            console.log(result)
            res.status(201).send({ "name": "Jaime", "age": 25 });
        })
});

router.get('/DBaddRow', (req, res) => {
    client.query(`INSERT INTO people(name, age)
        VALUES ('Jaime', 25) RETURNING *;`,
        (err, result) => {
            if (err) {
                return res.status(401).send({
                    error: true,
                    message: err.message.replace(/\"/g, "'")
                });
            }
            const insertedValue = result?.rows[0]
            if (insertedValue.name !== 'Jaime'
                || insertedValue.age != 25) {
                return res.status(500).send({
                    error: true,
                    message: `Error! | Inseted Value: ${insertedValue}`
                });
            }
            res.status(201).send(insertedValue);
        })
});

router.get('/DBgetAll', (req, res) => {
    client.query("SELECT * FROM people;",
        (err, result) => {
            if (err) {
                return res.status(404).send({
                    error: true,
                    message: err.message
                });
            }
            res.status(200).json(result?.rows);
        })
});

module.exports = router;
