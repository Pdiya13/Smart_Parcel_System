const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const orderRoutes = require("./routes/orderRoute");
const profileRoutes = require("./routes/profileRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("App is running...");
});

module.exports = app;

