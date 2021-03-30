/* eslint-disable no-undef */
const Post = require("../models/post.model");
const User = require("../models/user.model");

authorizedUser = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user != req.userId) {
      res.status(400).send({
        message: "user not authorized",
      });
      return;
    }
    next();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

checkDuplicateEmail = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({ message: `Email is already used` });
  }
  next();
};

const verifyDatabase = {
  authorizedUser: authorizedUser,
  checkDuplicateEmail: checkDuplicateEmail,
};

module.exports = verifyDatabase;
