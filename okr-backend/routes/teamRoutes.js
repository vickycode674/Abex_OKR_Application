const express = require("express");
const { createTeam, getAllTeams, addUserToTeam } = require("../controllers/teamController");
const router = express.Router();

router.post("/", createTeam);
router.get("/", getAllTeams);
router.post("/add-user", addUserToTeam);

module.exports = router;
