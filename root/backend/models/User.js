const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	surname: {
		type: String,
		require: true
	},
	name: {
		type: String,
		require: true
	},
	email: {
		type: String,
		require: true,
		unique: true
	},
	password: {
		type: String,
		require: true,
	},
	profilePicture: {
		type: String,
		default: "",
	},
	coverPicture: {
		type: String,
		default: "",
	},
	followers: {
		type: Array,
		default: [],
	},
	followings: {
		type: Array,
		default: [],
	},
	desc: {
		type: String,
		max: 50,
	},
	city: {
		type: String,
		max: 50,
	},
	from: {
		type: String,
		max: 50,
	},
	relationship: {
		type: Number,
		enum: [1, 2, 3],
	},
	posts: {
		type: Array,
		default: []
	},
	feed: {
		type: Array,
		default: []
	}
});

module.exports = model("User", userSchema);