const router = require("express").Router();
const Post = require("../../models/Post");
const User = require("../../models/User");

router.post("/getPosts", [], async (req, res) => {
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

router.post("/addLike", [], async (req, res) => {
		try {
			const { user, post } = req.body;
			const postId = post._id;
			const userId = {
				userId: user.id
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
	}
);

router.post("/subtractLike", [], async (req, res) => {
		try {
			const { user, post } = req.body;
			const postId = post._id;
			const userId = {
				userId: user.id
			};

			const changedPost = await Post.findOneAndUpdate(
				{ _id: postId },
				{ $pull: { likes: { userId: user.id}}},
				{ new: true }
			);

			console.log(changedPost);

			res.json({ message: "Post unliked", post: changedPost });
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

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
	}
);

router.post("/getFeed", [], async (req, res) => {
		try {
			const { id } = req.body;

			const foundUser = await User.findById(id);
			const feed = await Post.find({ userId: id });

			res.json({ posts: feed});
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

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
	}
);


module.exports = router;