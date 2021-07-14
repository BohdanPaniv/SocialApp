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
    .isLowercase()
    .withMessage("Email: need small letters")
    .custom( async (email) => {
      return await User.findOne({ email }).then(user => {
        if (user) {
          return Promise.reject("Email already in use");
        }
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6 })
    .withMessage("Minimum password length is 6 characters")
];

const loginRequestValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is empty")
    .isEmail()
    .withMessage("Email is incorrect")
    .isLowercase()
    .withMessage("Email: need small letters"),
  body("password")
    .notEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6 })
    .withMessage("Minimum password length is 6 characters")
];

const changePasswordRequestValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("currentPassword is empty")
    .isLength({ min: 6 })
    .withMessage("Minimum current Password length is 6 characters"),
  body("newPassword")
    .notEmpty()
    .withMessage("newPassword is empty")
    .isLength({ min: 6 })
    .withMessage("Minimum new Password length is 6 characters"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is empty")
    .isLength({ min: 6 })
    .withMessage("Minimum confirmPassword length is 6 characters")
    .custom( async (value, { req }) => {
      if (value !== req.body.newPassword) {
        return Promise.reject("Password confirmation does not match new Password");
      }
    })
];

const resetPasswordRequestValidator = [
  body("password")
    .notEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6 })
    .withMessage("Minimum password length is 6 characters"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is empty")
    .isLength({ min: 6 })
    .withMessage("Minimum confirmPassword length is 6 characters")
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
    .isLowercase()
    .withMessage("Email: need small letters")
];

module.exports = {
  registerRequestValidator, 
  loginRequestValidator,
  changePasswordRequestValidator,
  sendToEmailRequestValidator,
  resetPasswordRequestValidator
};