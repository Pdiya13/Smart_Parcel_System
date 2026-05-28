const Order = require('../models/order');
const UserOrder = require('../models/user_order');
const User = require("../models/user");
const { Agent } = require("../models/agent");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { from, to, weight, date } = req.body;

    if (!from || !to || !weight || !date) {
      return res.status(400).json({ status: false, message: "Please provide all fields." });
    }

    const newOrder = new Order({ from, to, currlocation: from, weight, date, userId });
    await newOrder.save();
    console.log("Order placed:", newOrder);
    res.status(201).json({
      status: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to place order", error: err.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { currlocation } = req.body;

    if (!currlocation) {
      return res.status(400).json({ status: false, message: "Location is required" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { currlocation },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ status: false, message: "Order not found" });
    }

    await order.save();

    global.io.emit("order-location-updated", {
      orderId: order._id,
      currlocation: order.currlocation,
    });

    res.json({ status: true, message: "Location updated successfully", order });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to update location", error: err.message });
  }
};


const getOrdersForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ userId })
      .populate("userId", "name email phone") 
      .sort({ createdAt: -1 })
      .lean();

    const ordersWithAgents = await Promise.all(
      orders.map(async (order) => {
        if (order.status === "PENDING") {
          return { ...order, agent: null };
        }

        const userOrder = await UserOrder.findOne({ orderId: order._id })
          .populate("agentId", "name email phone") 
          .lean();

        return {
          ...order,
          agent: userOrder?.agentId || null,
        };
      })
    );

    res.json({
      status: true,
      orders: ordersWithAgents,
    });
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({
      status: false,
      message: "Error fetching orders",
      error: err.message,
    });
  }
};

const getOrdersForAgent = async (req, res) => {
  try {
    const agentId = req.user.id;
    if (!agentId) {
      return res.status(401).json({ status: false, message: "Invalid authentication" });
    }
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ status: false, message: "Agent not found" });
    }
    const orders = await Order.find({ 
      from: agent.city,
      rejectedBy: { $ne: agentId },
      status: "PENDING" 
    })
      .populate("userId", "name email phone city")  
      .sort({ date: 1 });
    res.status(200).json({ status: true, orders });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to fetch orders", error: err.message });
  }
};

const orderAccept = async (req, res) => {
  try {
    const id = req.params.id;
    const agentId = req.user.id; 
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.status !== "PENDING") {
      return res.status(400).json({ message: "Order already assigned" });
    }

    order.status = "ASSIGNED";
    await order.save();

    await UserOrder.create({
      userId: order.userId,
      orderId: order._id,
      agentId: agentId,
    });

    res.status(200).json({ message: "Order accepted successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to accept order", error: err.message });
  }
};

const deliveredOrder = async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, {
    status: "Delivered",
    deliveredAt: Date.now(),
  });

  res.json({ status: true, message: "Order delivered!" });
};

const rejectOrder = async (req, res) => {
  try {
    const agentId = req.user.id; 

    await Order.findByIdAndUpdate(req.params.id, {
      $addToSet: { rejectedBy: agentId }  
    });

    return res.json({ status: true, message: "Order rejected by agent" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};


const agentHistory = async (req, res) => {
  try {
    const agentId = req.user.id;
    if (!agentId) {
      return res.status(401).json({ status: false, message: "Invalid authentication" });
    }
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ status: false, message: "Agent not found" });
    }
    const orders = await UserOrder.find({ agentId })
      .populate({
        path: "orderId",
        options: { sort: { date: 1 } }
      })
      .populate("userId", "name email phone city");
    res.status(200).json({ status: true, orders });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to fetch orders", error: err.message });
  }
};

const findOptimizedRoute = async (req, res) => {
  const { source, destinations } = req.body;

  console.log("Source:", source);
console.log("Destinations:", destinations);
  // Graph with distances
  const graph = {
  Nadiad: {
    Ahemdabad: 50,
    Vadodara: 40,
    Gandhinagar: 80,
    Rajkot: 250,
    Bhavnagar: 140,
    Kutch: 550,
  },

  Ahemdabad: {
    Nadiad: 50,
    Vadodara: 90,
    Gandhinagar: 30,
    Rajkot: 200,
    Bhavnagar: 170,
    Kutch: 500,
  },

  Vadodara: {
    Nadiad: 40,
    Ahemdabad: 90,
    Gandhinagar: 120,
    Rajkot: 280,
    Bhavnagar: 100,
    Kutch: 580,
  },

  Gandhinagar: {
    Nadiad: 80,
    Ahemdabad: 30,
    Vadodara: 120,
    Rajkot: 250,
    Bhavnagar: 220,
    Kutch: 520,
  },

  Rajkot: {
    Nadiad: 250,
    Ahemdabad: 200,
    Vadodara: 280,
    Gandhinagar: 250,
    Bhavnagar: 260,
    Kutch: 300,
  },

  Bhavnagar: {
    Nadiad: 140,
    Ahemdabad: 170,
    Vadodara: 100,
    Gandhinagar: 220,
    Rajkot: 260,
    Kutch: 560,
  },

  Kutch: {
    Nadiad: 550,
    Ahemdabad: 500,
    Vadodara: 580,
    Gandhinagar: 520,
    Rajkot: 300,
    Bhavnagar: 560,
  },
};

  let currentCity = source;

  // Copy destinations
  let unvisited = [...destinations];

  let route = [source];
  let totalDistance = 0;

  // Greedy TSP
  while (unvisited.length > 0) {
    let nearestCity = null;
    let shortestDistance = Infinity;

    for (let city of unvisited) {
      // Check direct path exists
      if (
        graph[currentCity] &&
        graph[currentCity][city] !== undefined
      ) {
        let distance = graph[currentCity][city];

        if (distance < shortestDistance) {
          shortestDistance = distance;
          nearestCity = city;
        }
      }
    }

    // No reachable city found
    if (!nearestCity) {
      return res.status(400).json({
        message: `No reachable destination from ${currentCity}`,
      });
    }

    // Update route
    route.push(nearestCity);
    totalDistance += shortestDistance;

    // Move to next city
    currentCity = nearestCity;

    // Remove visited city
    unvisited = unvisited.filter(
      (city) => city !== nearestCity
    );
  }

  return res.json({
    source,
    optimizedRoute: route,
    totalDistance,
  });
};


const createOrder = async (req, res) => {
  try {
    const { orderId, amount } = req.body;
    if (!orderId || !amount) {
      return res.status(400).json({ success: false, message: "OrderId and amount are required" });
    }
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: `receipt_${orderId}`,
    };
    const razorOrder = await razorpay.orders.create(options);
    res.json({
      success: true,
      orderId: razorOrder.id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return res.status(400).json({ success: false, message: "Invalid payment details" });
    }
    await Order.findByIdAndUpdate(orderId, { status: "PAID" });
    res.json({ success: true, message: "Payment verified and order marked as PAID" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};

module.exports = { placeOrder, updateLocation, getOrdersForUser, getOrdersForAgent, orderAccept, rejectOrder, agentHistory, findOptimizedRoute, createOrder, verifyPayment ,deliveredOrder};
