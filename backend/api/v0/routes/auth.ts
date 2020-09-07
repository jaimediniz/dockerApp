import express from "express"

const router = express.Router();

router.get("/", (req, res) => {
    const response = {
        error: false,
        msg: "Admin Page",
        data: {},
    };
    return res.status(200).json(response);
});

module.exports = router;