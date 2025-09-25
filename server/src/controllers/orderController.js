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

    const newOrder = new Order({ from, to, weight, date, userId });
    await newOrder.save();

    res.status(201).json({
      status: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to place order", error: err.message });
  }
};

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

    //console.log(ordersWithAgents);
    res.json({ status: true, orders: ordersWithAgents });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Error fetching orders', error: err.message });
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

const findShortestPath = async (req, res) => {
  const { source, destinations } = req.body; 
  const graph = {
    Nadiad: { Ahmedabad: 50, Vadodara: 40 },
    Ahmedabad: { Nadiad: 50, Gandhinagar: 30, Rajkot: 200 },
    Gandhinagar: { Ahmedabad: 30, Vadodara: 120, Bhavnagar: 220 },
    Rajkot: { Ahmedabad: 200, Kutch: 300 },
    Vadodara: { Nadiad: 40, Gandhinagar: 120, Bhavnagar: 100 },
    Kutch: { Rajkot: 300 },
    Bhavnagar: { Vadodara: 100, Gandhinagar: 220 },
  };

  const dijkstra = (start) => {
    const distances = {};
    const prev = {};
    const pq = new Set(Object.keys(graph));
    for (let city of pq) {
      distances[city] = Infinity;
      prev[city] = null;
    }
    distances[start] = 0;
    while (pq.size) {
      let u = [...pq].reduce((a, b) =>
        distances[a] < distances[b] ? a : b
      );
      pq.delete(u);
      for (let neighbor in graph[u]) {
        let alt = distances[u] + graph[u][neighbor];
        if (alt < distances[neighbor]) {
          distances[neighbor] = alt;
          prev[neighbor] = u;
        }
      }
    }
    return { distances, prev };
  };

  const buildPath = (prev, target) => {
    let path = [];
    let u = target;
    while (u) {
      path.unshift(u);
      u = prev[u];
    }
    return path;
  };

  const { distances, prev } = dijkstra(source);
  const results = destinations.map((dest) => {
    return {
      destination: dest,
      distance: distances[dest],
      path: buildPath(prev, dest),
    };
  });

  return res.json({
    source,
    results,
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

module.exports = { placeOrder, getOrdersForUser, getOrdersForAgent, orderAccept, agentHistory, findShortestPath, createOrder, verifyPayment };
