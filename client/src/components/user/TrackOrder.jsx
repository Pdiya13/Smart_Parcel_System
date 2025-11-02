import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TrackOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const fetchOrder = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:8080/api/orders/userOrders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const found = res.data.orders.find((o) => o._id === id);
      if (found) setOrder(found);
    } catch (err) {
      console.error("Error fetching order:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:8080/api/orders/create-order",
        { orderId: id, amount: order.amount || 500 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId, key } = res.data;

      const options = {
        key,
        amount: (order.amount || 500) * 100,
        currency: "INR",
        name: "Samaan Parcel",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          alert("Payment successful!");

          await axios.post(
            "http://localhost:8080/api/orders/verify-payment",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          await fetchOrder();
        },
        prefill: {
          name: order.userId?.name || "Customer",
          email: order.userId?.email || "customer@example.com",
          contact: order.userId?.phone || "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="container p-4">
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Agent:</strong> {order.agent?.name || "Not Assigned"}</p>
      <p><strong>From:</strong> {order.from}</p>
      <p><strong>To:</strong> {order.to}</p>
      <p><strong>Amount:</strong> ₹{order.amount || 500}</p>

      {order.status !== "PAID" && (
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default TrackOrder;
