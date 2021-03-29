const controller = require("../controllers/comment.controller");
const { authJWT, verifyDatabase } = require("../middleware");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //Add comment
  app.post("/post/:id/comment", authJWT.verifyToken, controller.create_comment);

  //Update comment
  app.put(
    "/comment/:id",
    [authJWT.verifyToken, verifyDatabase.authorizedUser],
    controller.update_comment
  );

  //Delete comment
  app.delete(
    "/comment/:id",
    [authJWT.verifyToken, verifyDatabase.authorizedUser],
    controller.delete_comment
  );
};
