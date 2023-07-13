
const express = require("express");
 
const {get,add, deletePendingTask} = require("../controllers/PendingTaskController");

const verifyToken = require("../middleware/tokenHandling");

const router = express.Router();

router.get("/", get);
 router.post("/", add);
 router.delete("/:id", deletePendingTask);

module.exports = router;
 