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
		default: ""
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
		enum: [1, 2, 3],
		default: null
	}
});

module.exports = model("User", userSchema);