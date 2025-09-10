const express = require("express");
const { requireSignIn } = require("../middlewares/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/profileController");

const router = express.Router();

router.get("/user", requireSignIn, getProfile);    
router.put("/user", requireSignIn, updateProfile);


module.exports = router;