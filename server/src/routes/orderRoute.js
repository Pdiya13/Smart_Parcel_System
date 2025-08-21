const express = require("express");
const { placeOrder, getOrdersForUser } = require("../controllers/orderController");
const { requireSignIn } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/agentSelect", requireSignIn ,placeOrder);
router.get('/userOrders', requireSignIn, getOrdersForUser);

module.exports = router;

