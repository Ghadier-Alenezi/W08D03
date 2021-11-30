const express = require("express");
const userRouter = express.Router();

const { register, login, users, deleteUser } = require("../controllers/user");
const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization");

// user can regester and login
userRouter.post("/register", register);
userRouter.post("/login", login);

// only admin can get all users and delete a user
userRouter.get("/users", authentication, users);
userRouter.delete("/user/:id", authentication, deleteUser);

module.exports = userRouter;
