const taskModel = require("./../../db/models/task");

// add new task
const creatTask = (req, res) => {
  const { name, user, isDeleted } = req.body;
  const newTask = new taskModel({
    name,
    isDeleted,
    user,
  });
  newTask
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// get all tasks
const tasks = (req, res) => {
  taskModel
    .find({ userId: req.token.id, isCompleted: false, isDeleted: false })
    .then((result) => {
      res.status(200).json(result);
      // console.log(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

// get deleted task
const getDeletedTasks = (req, res) => {
  taskModel
    .find()
    .then((result) => {
      const tasks = result.filter((item) => {
        return item.isDeleted === true;
      });
      res.status(200).send(tasks);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// get a task by id
const task = (req, res) => {
  const { id } = req.params;
  taskModel
    .findById(id)
    .then((result) => {
      if (result.isDeleted === false) {
        res.status(200).json(result);
      } else {
        res.status(400).send("this task was deleted");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// update a task by id
const updateTask = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  taskModel
    .findByIdAndUpdate(id, { name })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// delete a task by id soft delete
const deleteTask = (req, res) => {
  const { id } = req.params;
  taskModel
    .findByIdAndUpdate(id, { isDeleted: true })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

// delete task
const deleteTaskForever = (req, res) => {
  const { id } = req.params;
  taskModel
    .findByIdAndDelete(id)
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  creatTask,
  tasks,
  getDeletedTasks,
  task,
  updateTask,
  deleteTask,
  deleteTaskForever,
};
