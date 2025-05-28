const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Organization", organizationSchema);
