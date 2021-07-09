const router = require("express").Router();
const User = require("../../models/User");
const userValidators = require('./requestValidators');
const { validationResult } = require("express-validator");

router.post("/getUser", [], async (req, res) => {
	
	try {
		const { userId } = req.body;
		const foundUser = await User.findById(userId);

		if (!foundUser) {
			return res.status(400).json({
				message: "User not found"
			});
		}

		const user = foundUser.toObject();
		delete user.password;

		res.json({ user });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/addFollowing", [], async (req, res) => {

	try {
		const { user, owner } = req.body;
		const changedUser = await User.findOneAndUpdate(
			{ _id: user._id },
			{ $push: { following: { userId: owner._id } } },
			{ new: true }
		).select("-password");

		await User.findOneAndUpdate(
			{ _id: owner._id },
			{ $push: { followers: { userId: user._id } } },
			{ new: true }
		);

		res.json({ message: "Following added", user: changedUser})
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/removeFollowing", [], async (req, res) => {

	try {
		const { user, owner } = req.body;
		const changedUser = await User.findOneAndUpdate(
			{ _id: user._id },
			{ $pull: { following: { userId: owner._id }}},
			{ new: true }
		).select("-password");

		await User.findOneAndUpdate(
			{ _id: owner._id },
			{ $pull: { followers: { userId: user._id } } },
			{ new: true }
		);

		res.json({ message: "Following removed", user: changedUser})
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/changeName", userValidators.changeNameRequestValidator, async (req, res) => {
	
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array()
			});
		}

		const { name, surname, userId } = req.body;

		const changedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ $set: { name: name, surname: surname }},
			{ new: true }
		).select("-password");

		res.json({ message: "Name changed", user: changedUser });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/changeProfilePicture", [], async (req, res) => {
	
	try {
		const { image, userId } = req.body;

		const changedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ $set: { profilePicture: image }},
			{ new: true }
		).select("-password");

		res.json({ message: "Profile picture changed", user: changedUser });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/changeCoverPicture", [], async (req, res) => {
	
	try {
		const { image, userId } = req.body;

		const changedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ $set: { coverPicture: image }},
			{ new: true }
		).select("-password");

		res.json({ message: "Cover picture changed", user: changedUser });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;