const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Agent = require("../models/agent");

const { hashPassword, comparePassword } = require("../helpers/authHelper");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await hashPassword(password);

    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

const agentsignup = async (req, res) => {
  try {
    const { name, email, password, city, phoneNo } = req.body;

    if (!name || !email || !password || !city || !phoneNo)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await Agent.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await hashPassword(password);

    const newAgent = new Agent({ name, email, password: hashed, city, phoneNo });
    await newAgent.save();

    res.status(201).json({ message: "Agent registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

const agentlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ email });
    if (!agent)
      return res.status(404).json({ message: "Agent not found" });

    const match = await comparePassword(password, agent.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { agentId: agent._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
module.exports = { signup, login, agentsignup, agentlogin};
