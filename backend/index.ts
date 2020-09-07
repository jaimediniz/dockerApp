import express from "express";
import cors from "cors";

const app = express();

// app.use(cors({ origin: ["http://127.0.0.1:4200"], credentials: true }));

app.use(express.json());

app.use("/api", require("./api"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}/api/v0`));