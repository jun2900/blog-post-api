const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

//Get post detail
exports.get_post_detail = async (req, res) => {
  const post = await Post.findById(req.params.id).populate("user");
  const comments = await Comment.find({ post: { _id: post._id } });
  res.send({
    username: post.user.username,
    title: post.title,
    post_content: post.content,
    publish: post.publish,
    date: post.date.toDateString(),
    comments,
  });
};

//Get all published posts
exports.get_all_published_posts = async (req, res) => {
  try {
    const posts = await Post.find({ publish: true }, "-__v");
    res.send({
      posts,
    });
  } catch (err) {
    res.status(500).send(`err internal`);
  }
};

//Get all posts associated to the user id in parameter
exports.get_user_posts = async (req, res) => {
  try {
    const posts = await Post.find({ user: { _id: req.userId } }, "-__v");
    const user = await User.findById(req.userId);
    res.send({
      username: user.username,
      posts,
    });
  } catch (err) {
    res.status(500).send({ message: `Error ${err}` });
  }
};

//Create post
exports.create_post = (req, res) => {
  const now = new Date();
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    publish: req.body.publish,
    date: now,
    user: {
      _id: req.userId,
    },
  });

  post.save((err) => {
    if (err) {
      return res.status(500).send({
        message: "Invalid input",
      });
    }
    console.log("Post created");
  });

  res.send({
    post,
  });
};

//Update post
exports.update_post = (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    publish: req.body.publish,
    date: new Date(),
    user: {
      _id: req.body.userId,
    },
  });

  Post.findByIdAndUpdate(req.params.id, post, {}, (err, thePost) => {
    if (err) {
      return res.send(err);
    }
    res.send(thePost);
  });
};

exports.delete_post = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id).exec();
    const comment = await Comment.find({ post: { _id: req.params.id } });

    if (comment) {
      await Comment.deleteMany({ post: { _id: req.params.id } });
    }
    res.send({ message: `Post has been deleted` });
  } catch (err) {
    if (err) {
      return res.status(500).send({
        message: `Error: ${err}`,
      });
    }
  }
};
