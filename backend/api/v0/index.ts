import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.json({ message: "Docker is easy 🐳" }));

module.exports = router;
