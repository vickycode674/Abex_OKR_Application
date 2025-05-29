const Team = require("../models/Team");

exports.createTeam = async (req, res) => {
  try {
    const { name, department } = req.body;
    const team = await Team.create({ name, department });
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate("department", "name") // if you want just department name
      .populate("members", "name email"); // fetch member details
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addUserToTeam = async (req, res) => {
  try {
    const { teamId, userId } = req.body;
    const team = await Team.findByIdAndUpdate(
      teamId,
      { $addToSet: { members: userId } },
      { new: true }
    ).populate("members");
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
