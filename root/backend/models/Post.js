const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String
    },
    imageName: {
      type: String
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Number
    },
    updatedAt: {
      type: Number
    }
  }
);

module.exports = model("Post", postSchema);