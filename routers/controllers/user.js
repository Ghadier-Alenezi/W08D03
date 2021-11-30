const userModel = require("./../../db/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SALT = Number(process.env.SALT);
const secret = process.env.SECRET_KEY;

const register = async (req, res) => {
  const { email, password, role } = req.body;
  const savedEmail = email.toLowerCase();
  const hashedPassword = await bcrypt.hash(password, SALT);

  const newUser = new userModel({
    email: savedEmail,
    password: hashedPassword,
    role,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const savedEmail = email.toLowerCase();

  userModel
    .findOne({ email: savedEmail })
    .then(async (result) => {
      if (result) {
        if (result.email == savedEmail) {
          const hashedPassword = await bcrypt.compare(
            password,
            result.password
          );
          const payload = {
            role: result.role,
          };
          // const options = {
          //   expiresIn = "60s"
          // };
          if (hashedPassword) {
            const token = jwt.sign(payload, secret);
            res.status(200).json({ result, token });
          } else {
            res.status(400).send("invalid email or password");
          }
        } else {
          res.status(400).send("invalid email or password");
        }
      } else {
        res.status(404).json("this email not exist!");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const users = (req, res) => {
  userModel
    .find({})
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  userModel
    .findByIdAndDelete(id)
    .then((result) => {
      // console.log(result);
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = { register, login, users, deleteUser };