const { body } = require("express-validator");

const changeNameRequestValidator = [
  body("name", "Name is empty").notEmpty(),
  body("surname", "Surname is empty").notEmpty()
];

module.exports = { changeNameRequestValidator };