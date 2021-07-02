const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

router.post(
	"/getPosts",
	[],
	async (req, res) => {
		try {
			const { userId } = req.body;
			const foundUser = await User.findById(userId);

			if (!foundUser) {
				return res.status(400).json({
					message: "User not found"
				});
			}

			res.json({ posts: foundUser.posts});

		} catch (error) {
			res.status(500).json(error);
		}
	}
);

router.post(
	"/addLike",
	[],
	async (req, res) => {
		try {
			const { user, post } = req.body;
			const postId = post._id;
			const foundUser = await User.findById(user.id);

			if (!foundUser) {
				return res.status(400).json({
					message: "User not found"
				});
			}

			const posts = foundUser.posts;
			const feed = foundUser.feed;
			const postIndex = posts.findIndex(x => x._id == postId);
			const feedIndex = feed.findIndex(x => x._id == postId);
			
			const userId = {
				userId: user.id
			};

			posts[postIndex].likes.push(userId);
			feed[feedIndex].likes.push(userId);

			foundUser.posts = posts;
			foundUser.feed = feed;

			const newUser = new User(foundUser);

			await newUser.save();

			res.json({ message: "Post liked" });
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

router.post(
	"/subtractLike",
	[],
	async (req, res) => {
		try {
			const { user, post } = req.body;
			const userId = user.id;
			const postId = post._id;
			const foundUser = await User.findById(userId);

			if (!foundUser) {
				return res.status(400).json({
					message: "User not found"
				});
			}

			const posts = foundUser.posts;
			const feed = foundUser.feed;
			const postIndex = posts.findIndex(x => x._id == postId);
			const feedIndex = feed.findIndex(x => x._id == postId);
			const postLikes = posts[postIndex].likes;
			const feedLikes = feed[feedIndex].likes;

			const postLikesIndex = postLikes.findIndex(x => x.userId == userId);
			const feedLikesIndex = feedLikes.findIndex(x => x.userId == userId);

			postLikes.splice(postLikesIndex, 1);
			feedLikes.splice(feedLikesIndex, 1);

			foundUser.posts[postIndex].likes = postLikes;
			foundUser.feed[feedIndex].likes = feedLikes;
			
			const newUser = new User(foundUser);

			await newUser.save();

			res.json({ message: "Post unliked" });
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

router.post(
	"/createPost",
	async (req, res) => {
		try {
      const { userId, description, image, createdAt } = req.body;
			const foundUser = await User.findById(userId);

			if (!foundUser) {
				return res.status(400).json({
					message: "User not found"
				});
			}

			const post = new Post({
				userId,
				imageName: image,
        description,
				createdAt
      });

			await foundUser.updateOne({ $push: { posts: post, feed: post } });
			
			res.json({
				post,
				message: "Post created"
			});
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

module.exports = router;