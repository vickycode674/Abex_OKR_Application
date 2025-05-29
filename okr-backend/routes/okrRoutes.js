const express = require("express");
const {
  createOKR,
  getAllOKRs,
  updateOKR,
  deleteOKR,
  getOKRById,
} = require("../controllers/okrController");

const router = express.Router();

router.post("/", createOKR);
router.get("/", getAllOKRs);
router.put("/:id", updateOKR);
router.get("/:id",getOKRById);
router.delete("/:id", deleteOKR);

module.exports = router;
