const { body } = require("express-validator");
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

const changePasswordRequestValidator = [
  body("password", "Password is empty").notEmpty(),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is empty")
    .custom( async (value, { req }) => {
      if (value !== req.body.password) {
        return Promise.reject("Password confirmation does not match password");
      }
    })
];

const sendToEmailRequestValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is empty")
    .isEmail()
    .withMessage("Email is incorrect")
];

module.exports = {
  registerRequestValidator, 
  loginRequestValidator,
  changePasswordRequestValidator,
  sendToEmailRequestValidator
};