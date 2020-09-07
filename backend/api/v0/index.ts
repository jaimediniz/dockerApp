import express from "express";
import * as log from './utils/logger';

const router = express.Router();

log.info({ component: 'Root', message: "Start route" })
router.get("/", (req, res) => res.json({ message: "Docker is easy 🐳" }));

module.exports = router;
