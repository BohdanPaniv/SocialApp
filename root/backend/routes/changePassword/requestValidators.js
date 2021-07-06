const { body, validationResult } = require("express-validator");

const checkEmailValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is empty")
    .isEmail()
    .withMessage("Incorrect email")
    .custom( async (email) => {
      return await User.findOne({ email }).then(user => {
        if (!user) {
          return Promise.reject("User not fount");
        }
      });
    })
];

module.exports = checkEmailValidator;