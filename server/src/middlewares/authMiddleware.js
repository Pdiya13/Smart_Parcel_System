const jwt = require("jsonwebtoken");

const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token)
      return res.status(401).json({ message: "Token missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

module.exports = { requireSignIn };
