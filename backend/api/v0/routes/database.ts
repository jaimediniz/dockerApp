import express from "express"
import { createTable, deleteTable, addRow, getAll } from '../controllers/database'

const router = express.Router();

router.get("/createTable/:table", createTable)
router.get("/deleteTable/:table", deleteTable)
router.get("/addRow/:table", addRow)
router.get("/getAll/:table", getAll)
router.get("/", (req, res) => {
    const response = {
        error: false,
        msg: "DB",
        data: {},
    };
    return res.status(200).json(response);
});

module.exports = router;
