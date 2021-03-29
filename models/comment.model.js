const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  edited: { type: Boolean, default: false },
});

module.exports = mongoose.model("Comment", CommentSchema);
