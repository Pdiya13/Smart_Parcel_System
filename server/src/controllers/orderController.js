const Order = require('../models/order');
const UserOrder = require('../models/user_order');
const User = require("../models/user");
const Agent = require("../models/agent");

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { from, to, weight, date } = req.body;

    if (!from || !to || !weight || !date) {
      return res.status(400).json({ status: false, message: "Please provide all fields." });
    }

    const newOrder = new Order({ from, to, weight, date, userId });
    await newOrder.save();

    res.status(201).json({
      status: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Failed to place order", error: err.message });
  }
};

// Get all orders for a user with agent info
const getOrdersForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();

    const ordersWithAgents = await Promise.all(
      orders.map(async (order) => {
        if (order.status === 'PENDING') {
          return { ...order, agent: null };
        }

        const userOrder = await UserOrder.findOne({ orderId: order._id })
          .populate('agentId', 'name email')
          .lean();

        return { ...order, agent: userOrder?.agentId || null };
      })
    );

    res.json({ status: true, orders: ordersWithAgents });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Error fetching orders', error: err.message });
  }
};


const getOrdersForAgent = async (req, res) => {
  try {
    // The agent id comes from token (after requireSignIn middleware)
    const agentId = req.user.id;

    // Find agent to get the city
    const agent = await Agent.findById(agentId);
    if (!agent) return res.status(404).json({ message: "Agent not found" });

    // Fetch all orders where order.from matches agent.city
    const orders = await Order.find({ from: agent.city, status: "PENDING" })
      .populate("userId", "name email phone")  // populate user info
      .sort({ date: 1 });

    res.status(200).json({ status: true, orders });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to fetch orders", error: err.message });
  }
};


module.exports = { placeOrder, getOrdersForUser,getOrdersForAgent };