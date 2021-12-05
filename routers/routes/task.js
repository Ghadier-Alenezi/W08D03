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
const authorization = require("./../middleware/authorization");

// user auth
taskRouter.post("/newTask", authentication, creatTask);
taskRouter.get("/deletedTask", authentication, getDeletedTasks);
taskRouter.get("/task/:id", authentication, task);
taskRouter.put("/updateTask/:id", authentication, updateTask);
taskRouter.put("/deleteTask/:id", authentication, deleteTask);

// admin auth
taskRouter.get("/tasks", authentication, authorization, tasks);
taskRouter.put("/deleteTask/:id", authentication, authorization, deleteTask);

module.exports = taskRouter;
