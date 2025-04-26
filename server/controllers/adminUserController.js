const User = require("../models/User");
const History = require("../models/history");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const history = await History.find({ userId: user._id }).sort({
      createdAt: -1,
    });
    res.json({ user, history });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await History.deleteMany({ userId: req.params.id }); // Optional: remove user history too
    res.json({ message: "User and history deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

module.exports = { getAllUsers, getUserDetails, deleteUser };
