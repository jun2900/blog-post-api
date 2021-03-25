const controller = require("../controllers/post.controller");

module.exports = (app) => {
  app.get("/posts", controller.get_post_detail);
};
