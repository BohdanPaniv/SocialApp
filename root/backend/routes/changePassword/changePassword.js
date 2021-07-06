const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../../models/User");
const checkEmailValidator = require('./requestValidators');

// api/changePassword/checkEmail
router.post("/checkEmail", checkEmailValidator, async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					message: errors.array()
				});
			}

		} catch (error) {
			res.status(500).json(error);
		}
	}
);

// api/changePassword/changePassword
router.post("/changePassword", [], async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					message: errors.array()
				});
			}
      
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

module.exports = router;