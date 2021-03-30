/* eslint-disable no-undef */
const { body, validationResult } = require("express-validator");

validateSanitisePost = (req, res, next) => {
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape();
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape();
  body("publish").isBoolean().withMessage("Must be a boolean (true or false)");
  body("user", "User must not be empty").trim().isLength({ min: 1 }).escape();
  next();
};

validateSanitiseComment = (req, res, next) => {
  body("title", "Title must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape();
  body("content", "Content must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape();
  body("user", "User must not be empty.").trim().isLength({ min: 1 }).escape();
  body("post", "Post must not be empty.").trim().isLength({ min: 1 }).escape();
  body("edited").isBoolean().withMessage("Must be a boolean (true or false)");
  next();
};

validateSanitiseUser = (req, res, next) => {
  body("email", "Email must not be empty.").isEmail().isLength({ min: 1 });
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape();
  body("password", "Password must be more than 5 characters").isLength({
    min: 5,
  });
  next();
};

validateErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next();
};

const validationSanitation = {
  validateSanitisePost: validateSanitisePost,
  validateSanitiseComment: validateSanitiseComment,
  validateSanitiseUser: validateSanitiseUser,
  validateErrors: validateErrors,
};

module.exports = validationSanitation;
