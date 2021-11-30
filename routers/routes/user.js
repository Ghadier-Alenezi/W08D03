const express = require("express");
const userRouter = express.Router();

const { register, login, users } = require("../controllers/user");

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/users", users);

module.exports = userRouter;