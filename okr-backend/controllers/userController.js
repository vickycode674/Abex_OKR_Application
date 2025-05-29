const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("team");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
};

module.exports = { getUsers };
