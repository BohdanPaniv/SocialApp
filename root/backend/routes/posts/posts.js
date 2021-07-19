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

		res.json({ posts: search ? filteredPosts : userPosts });
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

		await Post.findOneAndUpdate(
			{ _id: postId },
			{ $push: { likes: userId } },
			{ new: true }
		);

		res.json({ message: "Post liked", likes: userId, postId });
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

		await Post.findOneAndUpdate(
			{ _id: postId },
			{ $pull: { likes: userId }},
			{ new: true }
		);

		res.json({ message: "Post unliked", likes: userId, postId });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/createPost", async (req, res) => {
	
	try {
		const { userId, description, postImageName, createdAt } = req.body;

		const post = new Post({
			userId,
			postImageName,
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
		const feed = [];
		const filteredFeed = [];

		for (const user of foundUser.following) {
			const posts = await Post.find({ userId: user.userId});

			if (posts) {
				for (const post of posts) {
					const currentUser = await User.findById(user.userId);
					let currentPost = post.toObject();

					currentPost.profilePictureName = currentUser.profilePictureName;
					currentPost.userName = currentUser.name;
					currentPost.userSurname = currentUser.surname;
					feed.push(currentPost);
				}
			}
		}

		const userPosts = await Post.find({ userId: _id });

		for (let post of userPosts) {
			let currentPost = post.toObject();
			currentPost.userName = foundUser.name;
			currentPost.userSurname = foundUser.surname;
			feed.push(currentPost);
		}

		if (search) {
			const regex = new RegExp(search, "i");

			for (const post of feed) {
				const userName = `${ post.userName } ${ post.userSurname }`;

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

		let post = await Post.findOneAndUpdate(
			{ _id: postId },
			{ $push: { comments: userComment } },
			{ new: true }
		);

		const user = await User.findById(userComment.userId);

		userComment.userName = user.name;
		userComment.userSurname = user.surname;
		userComment.profilePictureName = user.profilePictureName;

		res.json({ message: "Comment added", comment: userComment, postId });
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/getComments", [], async (req, res) => {
	
	try {
		const { post } = req.body;

		for (let comment of post.comments) {
			const user = await User.findById(comment.userId);
			comment.userName = user.name;
			comment.userSurname = user.surname;
			comment.profilePictureName = user.profilePictureName;
		}

		res.json({ post })
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;