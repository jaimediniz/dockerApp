import express from "express";
import {
  // createDatabase,
  // deleteDatabase,
  // updateTable,
  createTable,
  deleteTable,
  addRow,
  // deleteRow,
  // updateRow,
  getAll,
  getOne,
} from "../controllers/database";

const router = express.Router();

// Modify databases
// router.post('/:DB', createDatabase)
// router.delete('/:DB', deleteDatabase)

// Modify tables
router.post("/:DB/table/:table", createTable);
router.delete("/:DB/table/:table", deleteTable);
// router.put('/:DB/table/:table', updateTable)

// Modify rows
router.put("/:DB/table/:table", addRow);
// router.delete('/:DB/table/:table/:id', deleteRow)
// router.put('/:DB/table/:table/:id', updateRow)

// Get info
router.get("/:DB/table/:table", getAll);
router.get("/:DB/table/:table/:id", getOne);

// Default route
router.get("/", (req, res) => {
  const response = {
    error: false,
    msg: "DB",
    data: {},
  };
  return res.status(200).json(response);
});

module.exports = router;
