const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddleware");
const { getProfile, updateProfile, getAgentProfile, updateAgentProfile } = require("../controllers/profileController");

const router = express.Router();

router.get("/user", requireSignIn, getProfile);    
router.put("/user", requireSignIn, updateProfile);
router.get("/agent", requireSignIn, getAgentProfile);
router.put("/agent", requireSignIn, updateAgentProfile);


module.exports = router;