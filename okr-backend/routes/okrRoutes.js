const express = require("express");
const {
  createOKR,
  getAllOKRs,
  updateOKR,
  deleteOKR,
} = require("../controllers/okrController");

const router = express.Router();

router.post("/", createOKR);
router.get("/", getAllOKRs);
router.put("/:id", updateOKR);
router.delete("/:id", deleteOKR);

module.exports = router;
