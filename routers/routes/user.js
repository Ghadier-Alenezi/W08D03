const express = require("express");
const userRouter = express.Router();
// const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization")
const { register, login, users, deleteUser } = require("../controllers/user");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users" , users);
userRouter.delete("/user/:id" , deleteUser);

module.exports = userRouter;