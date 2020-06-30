const userCtrl = {};

const UserModel = require("../models/User");
const User = require("../models/User");

userCtrl.getUser = async (req, res) => {
  const user = await UserModel.find();
  res.json(user);
};

userCtrl.createUser = async (req, res) => {
  const { user } = req.body;
  const newUser = new UserModel({ user });
  await newUser.save();
  res.json("user created");
};

userCtrl.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "user deleted" });
};

module.exports = userCtrl;
