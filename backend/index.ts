import express, { Application, Request, Response, NextFunction } from "express"
import bodyParser from "body-parser"
import cors from "cors";

const app = express();
// app.use(cors({ origin: ["http://127.0.0.1:4200"], credentials: true }));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/api", require("./api"));

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0"
app.listen(PORT, HOST, () => console.log(`App listening on http://localhost:${PORT}/api/v0`));

module.exports = app
