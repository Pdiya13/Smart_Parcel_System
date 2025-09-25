const express = require("express");
const {
  placeOrder,
  getOrdersForUser,
  getOrdersForAgent,
  orderAccept,
  agentHistory,
  findShortestPath,
    createOrder,
    verifyPayment,
} = require("../controllers/orderController");

const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/agentSelect", requireSignIn, placeOrder);        
router.get("/userOrders", requireSignIn, getOrdersForUser); 

router.get("/agent-orders", requireSignIn, getOrdersForAgent);  
router.put("/:id/accept", requireSignIn, orderAccept);          
router.get("/agent-history", requireSignIn, agentHistory);      

router.post("/findpath", requireSignIn, findShortestPath); 

router.post("/create-order", requireSignIn, createOrder);
router.post("/verify-payment", requireSignIn, verifyPayment);

module.exports = router;
