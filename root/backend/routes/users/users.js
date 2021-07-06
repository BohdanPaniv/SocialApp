const router = require("express").Router();
const User = require("../../models/User");

router.post("/getUser", [], async (req, res) => {
		try {
      const { userId } = req.body;

      const foundUser = await User.findById(userId);

			if (!foundUser) {
				return res.status(400).json({
					message: "User not found"
				});
			}

      const user = {
        id: userId,
        surname: foundUser.surname,
        name: foundUser.name,
        profilePicture: foundUser.profilePicture,
				coverPicture: foundUser.coverPicture,
				followers: foundUser.followers
      };

      res.json({ user });
		} catch (error) {
			res.status(500).json(error);
		}
	}
);

module.exports = router;