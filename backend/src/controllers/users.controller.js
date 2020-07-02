const userCtrl = {};

const User = require("../models/User");

userCtrl.getUser = async (req, res) => {
  const user = await User.find();
  res.json(user);
};

userCtrl.createUser = async (req, res) => {
  const { user } = req.body;
  const newUser = new User({ user });
  await newUser.save();
  res.json("user created");
};

userCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "user deleted" });
};

module.exports = userCtrl;
