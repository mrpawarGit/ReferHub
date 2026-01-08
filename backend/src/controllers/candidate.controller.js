const Candidate = require("../models/Candidate.model");

// create candidate
exports.createCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;

    // check - all req
    if (!name || !email || !phone || !jobTitle) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const candidate = await Candidate.create({
      name,
      email,
      phone,
      jobTitle,
      referredBy: req.user.id,
    });

    // send res
    res.status(201).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// get All candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find()
      .populate("referredBy", "name email")
      .sort({ createdAt: -1 });

    // send res
    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update candidate - By id
exports.updateCandidate = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // check
    if (!["Pending", "Reviewed", "Hired"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // check
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // send res
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Candidate - By id
exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndDelete(id);
    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }
    // res
    res.json({ message: "Candidate deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
