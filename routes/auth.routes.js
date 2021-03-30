const controller = require("../controllers/auth.controller");
const { authJWT, verifyDatabase, validator } = require("../middleware");

module.exports = (app) => {
  //Login
  app.post(
    "/login",
    [validator.validateSanitiseUser, validator.validateErrors],
    controller.login
  );

  //Create user
  app.post(
    "/signup",
    [
      authJWT.verifyToken,
      verifyDatabase.checkDuplicateEmail,
      validator.validateSanitiseUser,
      validator.validateErrors,
    ],
    controller.signup
  );
};
