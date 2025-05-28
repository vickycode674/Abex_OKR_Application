const Department = require("../models/Departments");

exports.createDepartment = async (req, res) => {
  try {
    const { name, organization } = req.body;
    const dept = await Department.create({ name, organization });
    res.status(201).json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const depts = await Department.find().populate("organization");
    res.status(200).json(depts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
