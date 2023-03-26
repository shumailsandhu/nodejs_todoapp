const { errorHandler } = require("../middlewears/error.js");
const Task = require("../models/task.js");
const User = require("../models/user.js");

const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      success: "true",
      message: "Task Added",
    });
  } catch (error) {
    next(error);
  }
};

const getMyTasks = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const Tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: "true",
      Tasks,
    });
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new errorHandler("Task Not Found", 404));

    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: "true",
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};
const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new errorHandler("Task Not Found", 404));

    await task.deleteOne();

    res.status(200).json({
      success: "true",
      message: "Task Deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { newTask, getMyTasks, deleteTask, updateTask };
