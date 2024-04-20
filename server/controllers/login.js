const Users = require("../models/Users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorLogger = require("../utils/errorLogger");
const jwtKey = process.env.JWT_KEY

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await Users.findOne({ email: email });
    if (userExists) {
      const passwordValid = bcrypt.compareSync(password, userExists.password);

      if (passwordValid) {
        jwt.sign(
          { email: userExists.email, _id: userExists._id, name: userExists.name },
          jwtKey,
          {},
          (error, token) => {
            try {
              if (error) throw error;
              const { name, email, _id, phone } = userExists;
              res.cookie("authToken", token).json({ name, email, _id, phone });
            } catch (error) {
              console.log(error);
              res.status(422).json(error.message);
            }
          }
        );
      } else {
        res.status(422).json("password is invalid");
      }
    } else {
      res.status(422).json("not found");
    }
  } catch (error) {
    console.log(error);
    const errorLog = `At route ${req.url} ${error}`;
    errorLogger(errorLog);
    res.status(422).json(error.message);
  }
};

module.exports = login;