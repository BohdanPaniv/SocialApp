const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	surname: {
		type: String,
		require: true,
		default: ""
	},
	name: {
		type: String,
		require: true,
		default: ""
	},
	email: {
		type: String,
		require: true,
		unique: true,
		default: ""
	},
	password: {
		type: String,
		require: true,
		default: ""
	},
	profilePictureName: {
		type: String,
		default: "",
	},
	coverPictureName: {
		type: String,
		default: "",
	},
	followers: {
		type: Array,
		default: [],
	},
	following: {
		type: Array,
		default: [],
	},
	city: {
		type: String,
		max: 50,
		default: ""
	},
	from: {
		type: String,
		max: 50,
		default: ""
	},
	relationship: {
		type: Number,
		enum: [0, 1, 2, 3],
		default: 0
	},
	resetToken: {
		type: String,
		default: ""
	},
	expireToken: {
		type: Number,
		default: 0
	}
});

module.exports = model("User", userSchema);