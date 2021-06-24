const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwtWebToken = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// api/auth/register
router.post(
	"/register",
	[
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
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array()
				});
			}
			
			const { email, password, name, surname } = req.body;

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const user = new User({
				surname,
				name,
				email,
				password: hashedPassword
			});

			await user.save();

			res.status(201).json({ message: "User is created"});
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

// api/auth/login
router.post(
	"/login",
	[
		body("email")
			.notEmpty()
			.withMessage("Email is empty")
			.isEmail()
			.withMessage("Email is incorrect"),
		body("password", "Password is empty")
			.notEmpty()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: "Incorrect registration data"
				});
			}

			const { email, password } = req.body;

			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: "User not found"});
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ message: "User not found"});
			}

			const token = jwtWebToken.sign(
				{ userId: user.id },
				process.env.jwtSecret,
				{ expiresIn: "1h" }
			);

			res.json({
				token,
				userId: user.id
			});
			
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

module.exports = router;