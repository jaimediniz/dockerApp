import express from "express";

import { writeFile } from "fs";

const app = express();

app.get("/", (req, res) => res.json({ message: "Docker is easy 🐳" }));

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`app listening on http://localhost:${port}`)
);
