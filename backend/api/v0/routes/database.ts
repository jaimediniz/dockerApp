import express from "express"
import { createTable, deleteTable, addRow, getAll } from '../controllers/database'

const router = express.Router();

router.get("/createTable", createTable)
router.get("/deleteTable", deleteTable)
router.get("/addRow", addRow)
router.get("/getAll", getAll)
router.get("/", (req, res) => {
    const response = {
        error: false,
        msg: "DB",
        data: {},
    };
    return res.status(200).json(response);
});

module.exports = router;
