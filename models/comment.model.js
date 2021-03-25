const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

module.exports = mongoose.schema("Comment", CommentSchema);
