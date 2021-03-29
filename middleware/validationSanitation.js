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

validateErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
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

const validationSanitation = {
  validateSanitisePost: validateSanitisePost,
  validateSanitiseComment: validateSanitiseComment,
  validateErrors: validateErrors,
};

module.exports = validationSanitation;
