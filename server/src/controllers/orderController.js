const Order = require('../models/order');

const placeOrder = async (req, res) => {
  try {
    const { from, to, weight, date } = req.body;

    if (!from || !to || !weight || !date) {
      return res.status(400).json({ status: false, message: "Please provide from, to, weight, and date." });
    }

    const newOrder = new Order({
      from,
      to,
      weight,
      date 
    });

    await newOrder.save();

    res.status(201).json({
      status: true,
      message: "Order placed successfully",
      order: newOrder
    });
    }
    catch (err) {
    res.status(500).json({
      status: false,
      message: "Failed to place order",
      error: err.message
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json({ status: true, orders });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { placeOrder, getOrders };
