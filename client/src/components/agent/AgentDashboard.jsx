import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AgentDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setTrips(res.data.orders);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching orders", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-vh-100 p-4 bg-light font-monospace">

      <header className="d-flex justify-content-between align-items-center p-3 mb-4 bg-white rounded shadow-sm">
        <div className="d-flex align-items-center gap-3">
          <span style={{ fontSize: '1.5rem' }}>📦</span>
          <h1 className="m-0 fw-bold fs-4">Samaan</h1>
        </div>
        <div className="d-flex align-items-center gap-2 text-secondary">
          <span>B1_CE089_DIYA PATEL</span>
          <span>👤</span>
        </div>
      </header>

      <section className="bg-white rounded shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fs-5 fw-semibold m-0">Your Trips</h3>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-primary">
              Chats
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                const from = prompt("From city?");
                const to = prompt("To city?");
                const weight = prompt("Weight?");
                const date = prompt("Date? (YYYY-MM-DD)");
                if (from && to && weight && date) {
                  axios.post('http://localhost:5000/api/orders', { from, to, weight, date })
                    .then(() => fetchOrders());
                }
              }}
            >
              Add New Trip
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                {['ID', 'FROM', 'TO', 'DATE', 'WEIGHT', 'STATUS'].map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {trips.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-5">
                    No trips available.
                  </td>
                </tr>
              ) : (
                trips.map((trip) => (
                  <tr key={trip._id}>
                    <td>{trip._id}</td>
                    <td>{trip.from}</td>
                    <td>{trip.to}</td>
                    <td>{new Date(trip.date).toLocaleDateString()}</td>
                    <td>{trip.weight} kg</td>
                    <td>{trip.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default AgentDashboard;
