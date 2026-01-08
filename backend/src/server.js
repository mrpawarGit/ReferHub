const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connect
connectDB();

// Test / Default Route
app.get("/", (req, res) => {
  res.json({ msg: "ReferHub API Running" });
});

// 404 Handle
app.use((req, res) => {
  res.status(404).json({ msg: "Not Found" });
});

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
