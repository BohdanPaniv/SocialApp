const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post(
	"/getFeed",
	[],
	async (req, res) => {
		try {
			const { id } = req.body;
			const foundUser = await User.findById(id);

			if (!foundUser) {
				return res.status(400).json({
					message: "User not found"
				});
			}

			const feed = foundUser.feed;

			res.json({ posts: feed});
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

module.exports = router;