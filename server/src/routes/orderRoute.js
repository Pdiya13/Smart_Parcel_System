const express = require("express");
const { placeOrder } = require("../controllers/orderController");
const { getOrders } = require("../controllers/orderController");
const { requireSignIn } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", requireSignIn ,placeOrder);
router.get('/', requireSignIn, getOrders);

module.exports = router;

