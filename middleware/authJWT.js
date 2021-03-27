/* eslint-disable no-undef */
require("dotenv").config();

const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: `No token provided`,
    });
  }

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: `Unauthorized!`,
        });
      }
      req.userId = decoded.id;
      next();
    });
  } catch (err) {
    return res.status(501).json({
      error: err.toString(),
    });
  }
};

const authJWT = {
  verifyToken: verifyToken,
};

module.exports = authJWT;
