const router = require("express").Router();
const Post = require("../../models/Post");
const User = require("../../models/User");

router.post("/getProfilePosts", [], async (req, res) => {
	try {
		const { _id, search } = req.body;
		const foundUser = await User.findById(_id);

		if (!foundUser) {
			return res.status(400).json({
				message: "User not found"
			});
		}

		const userPosts = await Post.find({ userId: _id });
		let filteredPosts = [];

		if (search) {
			const regex = new RegExp(`${search}`, "i");

			filteredPosts = userPosts.filter(post => {
				if (regex.test(post.description)) {
					return true;
				}

				return false;
			});
		}

		res.json({ posts: search ? filteredPosts : userPosts});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/addLike", [], async (req, res) => {
	try {
		const { user, post } = req.body;
		const postId = post._id;
		const userId = {
			userId: user._id
		};

		const changedPost = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $push: { likes: userId } },
			{ new: true }
		);

		res.json({ message: "Post liked", post: changedPost });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/removeLike", [], async (req, res) => {
	try {
		const { user, post } = req.body;
		const postId = post._id;
		const userId = {
			userId: user._id
		};

		const changedPost = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $pull: { likes: { userId: user._id }}},
			{ new: true }
		);

		res.json({ message: "Post unliked", post: changedPost });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/createPost", async (req, res) => {
	try {
		const { userId, description, imageName, createdAt } = req.body;

		const post = new Post({
			userId,
			imageName,
			description,
			createdAt
		});

		await post.save();

		res.json({
			post,
			message: "Post created"
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/getFeed", [], async (req, res) => {
	try {
		const { _id, search } = req.body;

		const foundUser = await User.findById(_id);
		let feed = [];
		let filteredFeed = [];

		for (const user of foundUser.following) {
			const following = await Post.find({ userId: user.userId});

			if (following) {
				following.forEach(item => {
					feed.push(item);
				});
			}
		}

		const userPosts = await Post.find({ userId: _id });

		for (const post of userPosts) {
			feed.push(post);
		}

		if (search) {
			const regex = new RegExp(`${search}`, "i");

			for (const post of feed) {
				const user = await User.findById(post.userId);
				const userName = `${user.name} ${user.surname}`;

				if (regex.test(userName) || regex.test(post.description)) {
					filteredFeed.push(post);
				}
			}
		}

		res.json({ posts: search ? filteredFeed : feed });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/addComment", [], async (req, res) => {
	try {
		const { userComment, postId } = req.body;

		const changedPost = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $push: { comments: userComment } },
			{ new: true }
		);

		res.json({ message: "Comment added", post: changedPost });
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;