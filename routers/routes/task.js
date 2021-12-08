const express = require("express");
const taskRouter = express.Router();

const {
  creatTask,
  tasks,
  task,
  updateTask,
  deleteTask,
  deleteTaskForever,
} = require("../controllers/task");
const authentication = require("./../middleware/authentication");
const authorization = require("./../middleware/authorization");

// user auth
taskRouter.post("/newTask", authentication, creatTask);
taskRouter.get("/tasks", authentication, tasks);
taskRouter.put("/updateTask/:id", authentication, updateTask);
taskRouter.delete("/deleteTask/:id", authentication, deleteTaskForever);

// admin auth
taskRouter.get("/task/:id", authentication, authorization, task);
taskRouter.put("/deleteByAdmin/:id", authentication, authorization, deleteTask);

module.exports = taskRouter;
