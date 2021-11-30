const express = require("express");
const roleRouter = express.Router();

const { newRole, roles } = require("../controllers/role");
const authentication = require("./../middleware/authentication");
// const authorization = require("./../middleware/authorization");

roleRouter.post("/newRole", authentication, newRole);
roleRouter.get("/roles", authentication, roles);

module.exports = roleRouter;
