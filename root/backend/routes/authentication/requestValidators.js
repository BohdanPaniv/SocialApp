const { body, validationResult } = require("express-validator");
const User = require("../../models/User");

const registerRequestValidator = [
  body("name", "Name is empty").notEmpty(),
  body("surname", "Surname is empty").notEmpty(),
  body("email")
    .notEmpty()
    .withMessage("Email is empty")
    .isEmail()
    .withMessage("Incorrect email")
    .custom( async (email) => {
      return await User.findOne({ email }).then(user => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      });
    }),
  body("password", "Password is empty").notEmpty()
];

const loginRequestValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is empty")
    .isEmail()
    .withMessage("Email is incorrect"),
  body("password", "Password is empty").notEmpty()
];

module.exports = { registerRequestValidator, loginRequestValidator };