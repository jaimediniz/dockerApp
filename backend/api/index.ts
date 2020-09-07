import express from "express";

const router = express.Router();

router.use("/v0", require("./v0"));

module.exports = router;