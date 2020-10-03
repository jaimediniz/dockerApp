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
  getOneTest,
} from "../controllers/database";

const router = express.Router();

// Modify databases
// router.route('/:DB').post(createDatabase).delete(deleteDatabase);

// Modify tables
router
  .route("/:DB/table/:table")
  .get(getAll)
  .post(createTable)
  .delete(deleteTable)
  .put(addRow);
router.route("/:DB/table/:table/:id").get(getOne); //.delete(deleteRow).put(updateRow);
router.route("/test").get(getOneTest);

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
