const Candidate = require("../models/Candidate.model");
const uploadToCloudinary = require("../utils/cloudinaryUpload");

// create candidate
exports.createCandidate = async (req, res) => {
  try {
    const { name, email, phone, jobTitle } = req.body;

    // check - all req
    if (!name || !email || !phone || !jobTitle) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const candidateData = {
      name,
      email,
      phone,
      jobTitle,
      referredBy: req.user.id,
    };

    // check pdf - if present, upload to cloudanry
    if (req.file) {
      const result = await uploadToCloudinary(req.file);
      candidateData.resumeUrl = result.secure_url;
    }
    const candidate = await Candidate.create(candidateData);
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
    const candidates = await Candidate.find({ referredBy: req.user.id })
      .populate("referredBy", "name email")
      .sort({ createdAt: -1 });

    // send res
    res.json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update status candidate - By id
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

// update Candidate Data
exports.updateCandidateData = async (req, res) => {
  try {
    const { name, phone, jobTitle } = req.body;

    const candidate = await Candidate.findByIdAndUpdate(
      { _id: req.params.id, referredBy: req.user.id },
      { name, phone, jobTitle },
      { new: true }
    );

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Failed to update candidate" });
  }
};

// Delete Candidate - By id
exports.deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByIdAndDelete({
      _id: req.params.id,
      referredBy: req.user.id,
    });
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
