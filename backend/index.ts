import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = (process.env.PORT || 3000) as number;
const HOST = process.env.HOST || "0.0.0.0";
const API_URL = process.env.API_URL || "localhost";

const app = express();

//options for cors midddleware
const options: cors.CorsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: API_URL,
  preflightContinue: false,
};

//use cors middleware
app.use(cors(options));

app.listen(PORT, HOST, () =>
  console.log(`App listening on http://localhost:${PORT}/api/v0`)
);

// app.use(cors({ origin: ['http://127.0.0.1:4200'], credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", require("./api"));

//enable pre-flight
app.options("*", cors(options));

module.exports = app;
