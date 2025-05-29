const OKR = require("../models/OKR");

exports.createOKR = async (req, res) => {
  try {
    const { objective, keyResults, progress, team, assignedTo } = req.body;

    const newOKR = await OKR.create({ objective, keyResults, progress, team, assignedTo });
    res.status(201).json(newOKR);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOKRs = async (req, res) => {
  try {
    const okrs = await OKR.find().populate("assignedTo", "name email").populate("team");
    res.status(200).json(okrs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOKRById = async (req, res) => {
  try {
    const okr = await OKR.findById(req.params.id)
      .populate("assignedTo", "name email")
      .populate("team");

    if (!okr) {
      return res.status(404).json({ error: "OKR not found" });
    }

    res.status(200).json(okr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateOKR = async (req, res) => {
  try {
    console.log("here is the backend====================")
    const okr = await OKR.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("here is the backend====================",okr);

    res.status(200).json(okr);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOKR = async (req, res) => {
  try {
    await OKR.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "OKR deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
