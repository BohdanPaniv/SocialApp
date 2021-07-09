const router = require("express").Router();
const Post = require("../../models/Post");
const User = require("../../models/User");

router.post("/getProfilePosts", [], async (req, res) => {
	try {
		const { _id } = req.body;
		const foundUser = await User.findById(_id);

		if (!foundUser) {
			return res.status(400).json({
				message: "User not found"
			});
		}

		const userPosts = await Post.find({ userId: _id });

		res.json({ posts: userPosts});

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
		const { _id } = req.body;

		const foundUser = await User.findById(_id);
		let feed = [];

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

		res.json({ posts: feed});
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