const Organization = require("../models/Organization");

exports.createOrganization = async (req, res) => {
  try {
    const org = await Organization.create({ name: req.body.name });
    res.status(201).json(org);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOrganizations = async (req, res) => {
  try {
    const orgs = await Organization.find();
    res.status(200).json(orgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
