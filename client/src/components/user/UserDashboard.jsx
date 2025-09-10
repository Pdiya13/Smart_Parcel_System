import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to view orders");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:8080/api/order/userOrders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(res.data.orders || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="d-flex flex-column vh-100 bg-light" style={{ padding: "15px" }}>
      <header
        className="d-flex justify-content-between align-items-center p-3 mb-3 rounded"
        style={{ backgroundColor: "#e8eaff" }}
      >
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-box-seam fs-3 text-primary"></i>
            <span className="fs-4 fw-semibold">Samaan</span>
          </div>

          <div
            className="d-flex align-items-center gap-2 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/userProfile")}
          >
          Profile <i className="bi bi-person-circle fs-4"></i>
          </div>
      </header>

      <main className="flex-grow-1 bg-white rounded shadow p-4 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">Your Orders</h3>
          {}
          <button
            className="btn btn-primary"
            onClick={() => navigate("/selectCarrier")}
          >
            Select Carrier
          </button>
        </div>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover table-bordered rounded mb-0">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Agent</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Weight (kg)</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, idx) => (
                    <tr key={order._id || idx}>
                      <th>{idx + 1}</th>
                      <td>{order._id}</td>
                      <td>{order.agent?.name || "Not assigned"}</td>
                      <td>{order.from}</td>
                      <td>{order.to}</td>
                      <td>{order.weight}</td>
                      <td>{moment(order.date).format("YYYY-MM-DD")}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;