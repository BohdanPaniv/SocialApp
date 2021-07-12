const { body } = require("express-validator");

const changeNameRequestValidator = [
  body("name", "Name is empty").notEmpty(),
  body("surname", "Surname is empty").notEmpty()
];

const changeUserInfoRequestValidator = [
  body("city", "City is empty").notEmpty(),
  body("from", "'From' is empty").notEmpty(),
  body("relationship", "Relationship is empty").notEmpty()
];

module.exports = {
  changeNameRequestValidator, 
  changeUserInfoRequestValidator
};