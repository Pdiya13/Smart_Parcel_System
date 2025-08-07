const express = require("express");
const { signup, login, agentsignup, agentlogin } = require("../controllers/authController");
const router = express.Router();

router.post("/user/signup", signup);
router.post("/user/login", login);
router.post("/agent/signup", agentsignup);
router.post("/agent/login", agentlogin);

module.exports = router;
