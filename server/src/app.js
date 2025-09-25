const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const orderRoutes = require("./routes/orderRoute");
const profileRoutes = require("./routes/profileRoutes");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
//app.use("/api/payments",orderRoutes);


app.get("/", (req, res) => {
  res.send("App is running...");
});

module.exports = app;