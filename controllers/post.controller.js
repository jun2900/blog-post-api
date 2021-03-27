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

exports.get_all_published_posts = async (req, res) => {
  const post = await Post.find({ publish: true });
  res.json({
    title: post.title,
    date: post.date.toDateString(),
  });
};

exports.create_post = async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    publish: req.body.publish,
    date: new Date(),
    user: {
      _id: req.body.userId,
    },
  });

  post.save((err) => {
    if (err) {
      return res.status(500).send({
        message: "Invalid input",
      });
    }
  });
};
