import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgentHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get("/api/orders/agent-history", {
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
    fetchHistory();
  }, []);

  if (loading) return <div className="p-4">Loading history...</div>;

  return (
    <div className="p-4 bg-light min-vh-100">
      <h2 className="mb-4">Order History</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">No history available yet.</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Weight</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((record) => (
              <tr key={record._id}>
                <td>{record.userId?.name}</td>
                <td>{record.orderId?.from}</td>
                <td>{record.orderId?.to}</td>
                <td>
                  {record.orderId?.date
                    ? new Date(record.orderId.date).toLocaleDateString()
                    : ""}
                </td>
                <td>{record.orderId?.weight}</td>
                <td>{record.orderId?.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AgentHistory;
