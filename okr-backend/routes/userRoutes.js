const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware");

router.get("/", getUsers);

module.exports = router;
