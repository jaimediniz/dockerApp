import express, { Application, Request, Response, NextFunction } from "express";

const router = express.Router();

router.use("/v0", require("./v0"));

module.exports = router;
