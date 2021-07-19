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

router.post("/changeUserInfo", userValidators.changeUserInfoRequestValidator, async (req, res) => {
	
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				message: errors.array()
			});
		}

		const { city, from, relationship, userId } = req.body;

		const changedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ $set: { city: city, from: from, relationship: relationship }},
			{ new: true }
		).select("-password");

		res.json({ message: "User info changed", user: changedUser });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/changeProfilePicture", [], async (req, res) => {
	
	try {
		const { image, userId } = req.body;

		const changedUser = await User.findOneAndUpdate(
			{ _id: userId },
			{ $set: { profilePictureName: image }},
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
			{ $set: { coverPictureName: image }},
			{ new: true }
		).select("-password");

		res.json({ message: "Cover picture changed", user: changedUser });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/getPossibleFollowing", [], async (req, res) => {
	
	try {
		const { user, search } = req.body;
		const users = await User.find({ _id: { $ne: user._id }}).select("-password");
		const filteredUsers = [];

		for (let currentUser of users) {
			let isMatch = false;
			
			user.following.forEach(following => {
				if (following.userId == currentUser._id) {
					isMatch = true;
				}
			});

			const following = {
				userId: currentUser._id,
				name: currentUser.name,
				surname: currentUser.surname,
				profilePictureName: currentUser.profilePictureName
			};

			console.log(following)

			if (!isMatch) {
				if (search) {
					const regex = new RegExp(`${search}`, "i");
					const followingName = `${following.name} ${following.surname}`;

					if (regex.test(followingName)) {
						filteredUsers.push(following);
					}
				} else {
					filteredUsers.push(following);
				}
			}
		}

		res.json({ users: filteredUsers });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/getFollowers", [], async (req, res) => {
	
	try {
		const { followers, search } = req.body;

		const newFollowers = [];
		const filteredFollowers = [];

		for (let follower of followers) {
			const user = await User.findById(follower.userId);
			follower.profilePictureName = user.profilePictureName;
			follower.name = user.name;
			follower.surname = user.surname;
			newFollowers.push(follower); 
		}

		if (search) {
			const regex = new RegExp(`${search}`, "i");

			for (const follower of newFollowers) {
				const userName = `${follower.name} ${follower.surname}`;
				
				if (regex.test(userName)) {
					filteredFollowers.push(follower);
				}
			}
		}
		res.json({ followers: search ? filteredFollowers : newFollowers });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/getFollowing", [], async (req, res) => {
	
	try {
		const { following, search } = req.body;

		const newFollowing = [];
		const filteredFollowing = [];

		for (let currentFollowing of following) {
			const user = await User.findById(currentFollowing.userId);
			currentFollowing.profilePictureName = user.profilePictureName;
			currentFollowing.name = user.name;
			currentFollowing.surname = user.surname;
			newFollowing.push(currentFollowing); 
		}

		if (search) {
			const regex = new RegExp(search, "i");

			for (const currentFollowing of newFollowing) {
				const userName = `${currentFollowing.name} ${currentFollowing.surname}`;
				
				if (regex.test(userName)) {
					filteredFollowing.push(currentFollowing);
				}
			}
		}

		res.json({ following: search ? filteredFollowing : newFollowing });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;