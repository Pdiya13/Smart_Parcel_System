const User = require("../models/user");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("name email phone address"); 

    if (!user) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res.status(200).json({
      status: true,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        address: user.address || ""
      }
    });
  } catch (err) {
    console.error("GetProfile Error:", err.message);
    res.status(500).json({
      status: false,
      message: "Failed to fetch profile",
      error: err.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const userId = req.user.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, phone, address },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user, message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile, updateProfile };