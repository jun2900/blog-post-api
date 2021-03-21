const User = require("../models/user.model");
const bcrypt = require("bcrypt");

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
  res.send({ message: `User found` });
};
