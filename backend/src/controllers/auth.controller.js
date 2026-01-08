const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register / SignUp
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checkpoint - All fields are required
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // checkpoint - user exits or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Pass Hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // user creation
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // sending res
    res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
