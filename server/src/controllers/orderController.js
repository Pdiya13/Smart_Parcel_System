const Order = require('../models/order');

const placeOrder = async (req, res) => {
  try {
    const { from, to, weight, date } = req.body;

    if (!from || !to || !weight || !date) {
      return res.status(400).json({ message: "Please provide from, to, weight, and date." });
    }

    const newOrder = new Order({
      from,
      to,
      weight,
      date 
    });

    await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder
    });
    }
    catch (err) {
    res.status(500).json({
      message: "Failed to place order",
      error: err.message
    });
  }
};

module.exports = { placeOrder };
