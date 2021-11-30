const express = require("express");
const taskRouter = express.Router();
const {
  creatTask,
  tasks,
  getDeletedTasks,
  task,
  updateTask,
  deleteTask,
} = require("../controllers/task");
// const authentication = require("./../middleware/authentication")

taskRouter.post("/newTask", creatTask);
taskRouter.get("/tasks", tasks);
taskRouter.get("/deletedTask", getDeletedTasks);
taskRouter.get("/task/:id", task);
taskRouter.put("/task/:id", updateTask);
taskRouter.put("/updateTask/:id", deleteTask);

module.exports = taskRouter;
