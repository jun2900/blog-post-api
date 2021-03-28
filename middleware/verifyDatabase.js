/* eslint-disable no-undef */
const Post = require("../models/post.model");

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

const verifyDatabase = {
  authorizedUser: authorizedUser,
};

module.exports = verifyDatabase;
