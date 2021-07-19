const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwtWebToken = require("jsonwebtoken");
const User = require("../../models/User");
const authValidators = require("./requestValidators");
const { validationResult } = require("express-validator");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(sendgridTransport({
	auth:{ api_key:process.env.SENDGRID_API }
}));

// api/auth/register
router.post("/register", authValidators.registerRequestValidator, async (req, res) => {

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
});

// api/auth/login
router.post("/login", authValidators.loginRequestValidator, async (req, res) => {

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
			return res.status(400).json({ message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, foundUser.password);

		if (!isMatch) {
			return res.status(400).json({ message: "User not found" });
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

		const user = foundUser.toObject();
		delete user.password;

		res.json({
			token,
			user
		});
		
	} catch (error) {
		res.status(500).json(error);
	}
});

// api/auth/user
router.get("/user", async (req, res) => {
	
	try {
		const token = req.cookies?.token;

		if (!token) {
			return res.status(401).json({
				message: "User is not authorized"
			});
		}

		const decoded = jwtWebToken.verify(token, process.env.jwtSecret);

		if (!decoded) {
			return res.status(400).json({
				message: "Incorrect token"
			});
		}

		const foundUser = await User.findById(decoded.userId).select("-password");

		if (!foundUser) {
			return res.status(404).json({
				message: "User not found"
			});
		}

		res.json({
			token,
			user: foundUser
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/logOut", async (req, res) => {
	
	try {
		res.clearCookie("token");
		res.json({ message: "Cookie deleted"});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/changePassword", authValidators.changePasswordRequestValidator, async (req, res) => {

	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array()
			});
		}
		
		const { currentPassword, newPassword, userId } = req.body;
		const foundUser = await User.findById(userId);

		if (!foundUser) {
			return res.status(400).json({ message: "User not found" });
		}

		const isMatch = await bcrypt.compare(currentPassword, foundUser.password);

		if (!isMatch) {
			return res.status(400).json({ message: "User not found" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		foundUser.password = hashedPassword;
		await foundUser.save();

		res.json({ message: "Password changed" });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/sendToEmail", authValidators.sendToEmailRequestValidator, async (req, res) => {

	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array()
			});
		}

		const { email } = req.body;
		const foundUser = await User.findOne({ email });

		if (!foundUser) {
			return res.status(404).json({
				message: "User don't exists with that email"
			});
		}

		const token = jwtWebToken.sign(
			{ userId: foundUser.email },
			process.env.jwtSecret
		);

		let time = 1000 * 60 * 15;
		let expiresDate = new Date(new Date().getTime() + time);

		foundUser.resetToken = token;
		foundUser.expireToken = expiresDate;
		await foundUser.save();

		transporter.sendMail({
			to: foundUser.email,
			from: process.env.SENDGRID_EMAIL,
			subject: "Password reset",
			html: `
			<p>You requested for password reset.</p>
			<h3>Click in this <a href="${ process.env.RESET_PASSWORD_URL }/${ token }">link</a> to reset password.</h3>`
		});
		
		res.json({ message: "Check your email" });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/resetPassword", authValidators.resetPasswordRequestValidator, async (req, res) => {

	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array()
			});
		}
		
		const { password, resetToken } = req.body;
		const foundUser = await User.findOne({ resetToken });

		if (!foundUser) {
			return res.status(404).json({
				message: "User not found"
			});
		}

		if (foundUser.expireToken < Date.now()) {
			return res.status(404).json({
				message: "Session expired. Try again"
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		foundUser.password = hashedPassword;
		foundUser.expireToken = 0;
		foundUser.resetToken = "";
		await foundUser.save();

		res.json({ message: "Password changed" });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;