const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

exports.get_post_detail = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comments = await Comment.find({ post: { _id: post._id } });
  res.json({
    title: post.title,
    post_content: post.content,
    publish: post.publish,
    date: post.date.toDateString(),
    comment: [
      {
        comment_content: comments.content,
      },
    ],
  });
};

exports.get_all_posts = async (req, res) => {
  const post = await Post.find();
  res.json({
    title: post.title,
    date: post.date.toDateString(),
  });
};
