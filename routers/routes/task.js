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
const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization");

taskRouter.post("/newTask", authentication, creatTask);
taskRouter.get("/tasks", authentication, tasks);
taskRouter.get("/deletedTask", authentication, getDeletedTasks);
taskRouter.get("/task/:id", authentication, task);
taskRouter.put("/task/:id", authentication, updateTask);
taskRouter.put("/updateTask/:id", authentication, deleteTask);

module.exports = taskRouter;
