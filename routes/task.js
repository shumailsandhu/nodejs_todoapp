const express = require("express");
const {
  newTask,
  getMyTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.js");
const isAuthenticated = require("../middlewears/auth.js");
const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/all", isAuthenticated, getMyTasks);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);

module.exports = router;
