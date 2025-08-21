const Order = require('../models/order');

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const { from, to, weight, date } = req.body;
    console.log("hello");
    if (!from || !to || !weight || !date) {
      return res.status(400).json({ status: false, message: "Please provide all fields." });
    }

    const newOrder = new Order({
      from,
      to,
      weight,
      date,
      userId,
    });
    console.log("new order");
    await newOrder.save();
    console.log("save order");
    res.status(201).json({
      status: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Failed to place order",
      error: err.message
    });
  }
};

const getOrdersForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res.json({ status: true, orders });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Error fetching orders',
      error: err.message
    });
  }
};

module.exports = { placeOrder, getOrdersForUser };