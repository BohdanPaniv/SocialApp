const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwtWebToken = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

// api/auth/register
router.post(
	"/register",
	[
		body("name", "Name is empty")
			.notEmpty(),
		body("surname", "Surname is empty")
			.notEmpty(),
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
		body("password", "Password is empty")
			.notEmpty()
	],
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					message: errors.array()
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

			res.json({ message: "User created" });
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
					message: errors.array()
				});
			}

			const { email, password } = req.body;
			const foundUser = await User.findOne({ email });

			if (!foundUser) {
				return res.status(400).json({
					message: "User not found"
				});
			}

			const isMatch = await bcrypt.compare(password, foundUser.password);

			if (!isMatch) {
				return res.status(400).json({
					message: "User not found"
				});
			}

			const token = jwtWebToken.sign(
				{ userId: foundUser.id },
				process.env.jwtSecret
			);

			let time = 1000 * 60 * 60 * 24 * 30;
			let expiresDate = new Date(new Date().getTime() + time);

			res.cookie("token", token, {
				expires: expiresDate,
				httpOnly: true
			});

			const user = {
				id: foundUser.id,
				surname: foundUser.surname,
				name: foundUser.name,
				email: foundUser.email,
				profilePicture: foundUser.profilePicture,
				coverPicture: foundUser.coverPicture,
				desc: foundUser.desc,
				city: foundUser.city,
				from: foundUser.from,
				relationship: foundUser.relationship
			};

			res.json({
				token,
				user
			});
			
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

// api/auth/user
router.get(
	"/user",
	async (req, res) => {
		try {
			const token = req.cookies?.token;

			if (!token) {
				return res.status(400).json({
					message: "User does not exist"
				});
			}

			const decoded = jwtWebToken.verify(token, process.env.jwtSecret);

			if (!decoded) {
				return res.status(400).json({
					message: "Incorrect token"
				});
			}

			const foundUser = await User.findById(decoded.userId);

			if (!foundUser) {
				return res.status(400).json({
					message: "User not found"
				});
			}

			const user = {
				id: foundUser.id,
				surname: foundUser.surname,
				name: foundUser.name,
				email: foundUser.email,
				profilePicture: foundUser.profilePicture,
				coverPicture: foundUser.coverPicture,
				desc: foundUser.desc,
				city: foundUser.city,
				from: foundUser.from,
				relationship: foundUser.relationship
			};

			res.json({
				token,
				user
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

module.exports = router;