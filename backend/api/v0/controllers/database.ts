import { Request, Response } from "express";
import * as log from "../utils/logger";
import { Pool } from "pg";

const section = "Controllers | Database |";

const DB = process.env.DB || "postgres";
const DB_USER = process.env.DB_USER || "database-user";
const DB_PASSWORD = process.env.DB_PASSWORD || "password";

const connectionString = `postgres://${DB_USER}:${DB_PASSWORD}@db:5432`;

export async function createTable(req: Request, res: Response) {
  const component = log.component(`${section} createTable`);
  const pool = new Pool({
    connectionString: `${connectionString}/${req.params.DB}`,
  });
  const client = await pool.connect();

  await (async () => {
    var response;
    try {
      response = await client.query(
        `CREATE TABLE ${req.params.table} (id SERIAL PRIMARY KEY, name text, age integer);`
      );
    } finally {
      client.release();
    }

    if (false) {
      return res.status(401).send({
        error: true,
        message: "table not created.",
        object: {},
      });
    }

    const message = `table '${req.params.table}' was created.`;
    log.info({ component, message });
    res.status(201).send({
      error: false,
      message,
      object: {},
    });
  })().catch((error) => {
    log.error({ component, message: error.message.replace(/\"/g, "'"), error });
    return res.status(500).send({
      error: true,
      message: error.message.replace(/\"/g, "'"),
      object: {},
    });
  });
}

export async function deleteTable(req: Request, res: Response) {
  const component = log.component(`${section} deleteTable`);
  const pool = new Pool({
    connectionString: `${connectionString}/${req.params.DB}`,
  });
  const client = await pool.connect();

  await (async () => {
    var response;
    try {
      response = await client.query(`DROP TABLE ${req.params.table};`);
    } finally {
      client.release();
    }

    if (false) {
      return res.status(401).send({
        error: true,
        message: "table not deleted!",
        object: {},
      });
    }

    const message = `table '${req.params.table}' was deleted.`;
    log.info({ component, message });
    res.status(201).send({
      error: false,
      message,
      object: {},
    });
  })().catch((error) => {
    log.error({ component, message: error.message.replace(/\"/g, "'"), error });
    return res.status(500).send({
      error: true,
      message: error.message.replace(/\"/g, "'"),
      object: {},
    });
  });
}

export async function addRow(req: Request, res: Response) {
  const component = log.component(`${section} addRow`);
  const pool = new Pool({
    connectionString: `${connectionString}/${req.params.DB}`,
  });
  const client = await pool.connect();

  await (async () => {
    var response;
    try {
      response = await client.query(
        `INSERT INTO ${req.params.table}(name, age) VALUES ('Jaime', 25) RETURNING *;`
      );
    } finally {
      client.release();
    }

    if (!response?.rows[0]) {
      return res.status(401).send({
        error: true,
        message: "Not inserted!",
        object: {},
      });
    }

    const insertedValue = response?.rows[0];
    res.status(201).send({
      error: false,
      message: "",
      object: insertedValue,
    });
  })().catch((error) => {
    log.error({ component, message: error.message.replace(/\"/g, "'"), error });
    return res.status(500).send({
      error: true,
      message: error.message.replace(/\"/g, "'"),
      object: {},
    });
  });
}

export async function getAll(req: Request, res: Response) {
  const component = log.component(`${section} getAll`);
  const pool = new Pool({
    connectionString: `${connectionString}/${req.params.DB}`,
  });
  const client = await pool.connect();

  await (async () => {
    var response;
    try {
      response = await client.query(`SELECT * FROM ${req.params.table};`);
    } finally {
      client.release();
    }

    if (!response?.rows) {
      return res.status(404).send({
        error: true,
        message: "Empty!",
        object: {},
      });
    }

    res.status(200).json({
      error: false,
      message: "",
      object: {
        rows: response?.rows,
      },
    });
  })().catch((error) => {
    log.error({ component, message: error.message.replace(/\"/g, "'"), error });
    return res.status(500).send({
      error: true,
      message: error.message.replace(/\"/g, "'"),
      object: {},
    });
  });
}

export async function getOne(req: Request, res: Response) {
  const component = log.component(`${section} getAll`);
  const pool = new Pool({
    connectionString: `${connectionString}/${req.params.DB}`,
  });
  const client = await pool.connect();

  await (async () => {
    var response;
    try {
      response = await client.query(
        `SELECT * FROM ${req.params.table} WHERE id=${req.params.id};`
      );
    } finally {
      client.release();
    }

    if (!response?.rows[0]) {
      return res.status(404).send({
        error: true,
        message: "Not founded!",
        object: {},
      });
    }

    res.status(200).json({
      error: false,
      message: "",
      object: response?.rows[0],
    });
  })().catch((error) => {
    log.error({ component, message: error.message.replace(/\"/g, "'"), error });
    return res.status(500).send({
      error: true,
      message: error.message.replace(/\"/g, "'"),
      object: {},
    });
  });
}
