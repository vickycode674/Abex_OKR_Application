const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: String,
  organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
});

module.exports = mongoose.model("Department", departmentSchema);
