const express = require("express");
const { placeOrder, getOrdersForUser, getOrdersForAgent } = require("../controllers/orderController");
const { requireSignIn } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/agentSelect", requireSignIn ,placeOrder);
router.get('/userOrders', requireSignIn, getOrdersForUser);
router.get("/agent-orders", requireSignIn, getOrdersForAgent);

module.exports = router;

