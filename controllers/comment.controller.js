const Comment = require("../models/comment.model");

//Post comment
exports.create_comment = (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    post: req.params.id,
  });

  comment.save((err) => {
    if (err) {
      return res.send({
        message: `error: ${err}`,
      });
    }
    res.send({
      comment,
    });
  });
};

//Update comment
exports.update_comment = (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    edited: true,
  });

  Comment.findByIdAndUpdate(req.params.id, comment, {}, (err, theComment) => {
    if (err) {
      return res.status(500).send({
        message: `Error ${err}`,
      });
    }
    res.send({
      theComment,
    });
  });
};

// Delete comment
exports.delete_comment = (req, res) => {
  Comment.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      return res.status(500).send({
        message: `Error ${err}`,
      });
    }
    res.send({
      message: `Comment has been removed`,
    });
  });
};
