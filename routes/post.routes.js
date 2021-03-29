const controller = require("../controllers/post.controller");
const { authJWT, verifyDatabase } = require("../middleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Get all published posts
  app.get("/", controller.get_all_published_posts);

  //Create post
  app.post("/post/create", authJWT.verifyToken, controller.create_post);

  //Get detailed posts
  app.get("/post/:id", controller.get_post_detail);

  //Update post
  app.put(
    "/post/:id",
    [authJWT.verifyToken, verifyDatabase.authorizedUser],
    controller.update_post
  );

  //Delete post
  app.delete(
    "/post/:id",
    [authJWT.verifyToken, verifyDatabase.authorizedUser],
    controller.delete_post
  );
};
