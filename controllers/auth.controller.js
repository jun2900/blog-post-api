require("dotenv").config();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });

  user.save((err) => {
    if (err) {
      return res.status(500).send({
        message: `Error: ${err}`,
      });
    }
    res.send({ message: `User was registered successfully` });
  });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send(`User not found`);
  }
  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      message: `Invalid password`,
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
  res.status(200).send({
    message: `Token successfully created`,
    accessToken: token,
  });
};
