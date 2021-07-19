const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: ""
    },
    postImageName: {
      type: String,
      default: ""
    },
    likes: {
      type: Array,
      default: []
    },
    comments: {
      type: Array,
      default: []
    },
    createdAt: {
      type: Number,
      default: 0
    },
    updatedAt: {
      type: Number,
      default: 0
    }
  }
);

module.exports = model("Post", postSchema);