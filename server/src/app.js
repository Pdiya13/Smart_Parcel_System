const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("../routes/authRoute");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("App is running...");
});

module.exports = app;
