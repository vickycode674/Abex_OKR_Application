const mongoose = require("mongoose");

const okrSchema = new mongoose.Schema({
  objective: String,
  keyResults: [String],
  progress: Number,
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("OKR", okrSchema);
