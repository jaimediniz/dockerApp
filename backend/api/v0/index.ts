import express, { Application, Request, Response, NextFunction } from 'express'
import * as log from './utils/logger';

const router = express.Router();

router.get("/", (req: Request, res: Response) => res.json({ message: "Docker is easy 🐳" }));
router.use("/DB", require('./routes/database'));

module.exports = router;
