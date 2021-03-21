const controller = require("../controllers/auth.controller");

module.exports = (app) => {
  //Login
  app.post("/login", controller.login);
};
