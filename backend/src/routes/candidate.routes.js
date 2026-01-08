const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createCandidate,
  getCandidates,
  updateCandidate,
  deleteCandidate,
} = require("../controllers/candidate.controller");
const upload = require("../middleware/upload.middleware");
const router = express.Router();

// create / ref a candidate
router.post("/", authMiddleware, upload.single("resume"), createCandidate);
// get all candidates
router.get("/", authMiddleware, getCandidates);
// update candidate
router.put("/:id/status", authMiddleware, updateCandidate);
// delete candidate
router.delete("/:id", authMiddleware, deleteCandidate);

module.exports = router;
