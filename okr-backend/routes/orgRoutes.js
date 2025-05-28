const express = require("express");
const { createOrganization, getAllOrganizations } = require("../controllers/organizationController");
const router = express.Router();

router.post("/", createOrganization);
router.get("/", getAllOrganizations);

module.exports = router;
