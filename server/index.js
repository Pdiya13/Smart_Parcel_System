const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Important for parsing JSON body

// Register Route
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received:", req.body);
  try {
    // Simulate saving to DB (you can replace with your real DB logic)
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
