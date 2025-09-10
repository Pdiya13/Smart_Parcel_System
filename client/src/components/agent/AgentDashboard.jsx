import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); // token saved after login
      const { data } = await axios.get("/api/orders/agent-orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.status) setOrders(data.orders);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/orders/${id}/accept`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Accepted order ${id}`);
      fetchOrders(); // refresh orders
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/orders/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Rejected order ${id}`);
      fetchOrders(); // refresh orders
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading orders...</div>;

  return (
    <div className="p-4 bg-light min-vh-100">
      <div className="d-flex justify-content-end mb-3">
        <div
          className="d-flex align-items-center gap-2 fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/CarrierProfile")}
        >
          Profile <i className="bi bi-person-circle fs-4"></i>
        </div>
      </div>

      <h2 className="mb-4">User Orders</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>From</th>
            <th>To</th>
            <th>Date</th>
            <th>Weight (kg)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.userId._id}</td>
              <td>{order.userId.name}</td>
              <td>{order.userId.email}</td>
              <td>{order.userId.phone}</td>
              <td>{order.from}</td>
              <td>{order.to}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.weight}</td>
              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={() => handleAccept(order._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleReject(order._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentDashboard;