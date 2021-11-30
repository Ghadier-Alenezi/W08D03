const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./db");

const app = express();
app.use(express.json());
app.use(cors());

const roleRouter = require("./routers/routes/role");
app.use(roleRouter);

// const userRouter = require("./routers/routes/user");
// app.use(userRouter);

// const taskRouter = require("./routers/routes/user");
// app.use(taskRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`SERVER ON ${PORT}`);
});
