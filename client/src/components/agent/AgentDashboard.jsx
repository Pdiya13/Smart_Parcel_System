import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token"); 
      
      if (!token) {
        navigate("/login");
        return;
      }
      
      const response = await axios.get("/api/orders/agent-orders", {
        headers: { Authorization: `Bearer ${token}` }, // ✅ fixed
      });
      
      if (response.data.status) {
        setOrders(response.data.orders);
      }
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      console.error("Error fetching orders:", err);
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
        `/api/orders/${id}/accept`, // ✅ fixed
        {},
        { headers: { Authorization: `Bearer ${token}` } } // ✅ fixed
      );
      alert(`Accepted order ${id}`); // ✅ fixed
      fetchOrders(); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    setOrders((prev) => prev.filter((order) => order._id !== id));
  };

  if (loading) return <div className="p-4">Loading orders...</div>;

  return (
    <div className="p-4 bg-light min-vh-100">
      {/* Navigation buttons */}
      <div className="d-flex justify-content-end gap-3 mb-3">
        <div
          className="d-flex align-items-center gap-2 fw-semibold btn btn-outline-primary"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/CarrierProfile")}
        >
          Profile <i className="bi bi-person-circle fs-4"></i>
        </div>

        <div
          className="d-flex align-items-center gap-2 fw-semibold btn btn-outline-success"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/AgentHistory")}
        >
          History <i className="bi bi-clock-history fs-4"></i>
        </div>

        <div
          className="d-flex align-items-center gap-2 fw-semibold btn btn-outline-warning"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/FindOptimalPath")}
        >
          Find Path <i className="bi bi-signpost-split fs-4"></i>
        </div>
      </div>

      <h2 className="mb-4">Agent Orders</h2>
      
      {/* No orders alert */}
      {orders.length === 0 && !loading && (
        <div className="alert alert-info">
          <h5>No orders available</h5>
          <p>
            There are currently no pending orders in your city. Orders will appear
            here when users place orders for pickup from your city.
          </p>
        </div>
      )}

      {/* Orders table */}
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
