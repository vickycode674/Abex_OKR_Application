const OKR = require("../models/OKR");
const Team = require("../models/Team");
const User = require("../models/User");
const Department = require("../models/Departments");

exports.getSummary = async (req, res) => {
  try {
    const totalOKRs = await OKR.countDocuments();
    const totalTeams = await Team.countDocuments();
    const activeUsers = await User.countDocuments({ active: true }); // or just all users
    const totalDepartments = await Department.countDocuments();

    res.status(200).json({
      totalOKRs,
      totalTeams,
      activeUsers,
      totalDepartments,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
