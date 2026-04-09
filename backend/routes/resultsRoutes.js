const express = require("express");
const router = express.Router();
const { saveResult, getRoomResults } = require("../controllers/resultsController");

router.post("/save", saveResult);
router.get("/:roomCode", getRoomResults);

module.exports = router;
