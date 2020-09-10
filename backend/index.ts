import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors';
import { Client } from 'pg';

const app = express();
const PORT = ((process.env.PORT || 3000) as number);
const HOST = process.env.HOST || '0.0.0.0';
const DB_URL = process.env.DB_URL || 'localhost';
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

app.listen(PORT, HOST, () => console.log(`App listening on http://localhost:${PORT}/api/v0`));

// app.use(cors({ origin: ['http://127.0.0.1:4200'], credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/DBcreateTable', (req, res) => {
    client.query(`CREATE TABLE people (
        id SERIAL PRIMARY KEY,
        name text,
        age integer
        );INSERT INTO people(name, age)
        VALUES ('Jaime', 25);`,
        (err, result) => {
            res.status(201).send({ "name": "Jaime", "age": 25 });
        })
});

app.get('/DBaddRow', (req, res) => {
    client.query(`INSERT INTO people(name, age)
        VALUES ('Jaime', 25);`,
        (err, result) => {
            res.status(201).send({ "name": "Jaime", "age": 25 });
        })
});

app.get('/DBgetAll', (req, res) => {
    client.query("SELECT * FROM people;",
        (err, result) => {
            if (err) {
                return res.status(404).send({
                    error: true,
                    message: err.message
                });
            }
            console.log(result);
            res.status(200).json(result?.rows);
        })
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api', require('./api'));

module.exports = app;
