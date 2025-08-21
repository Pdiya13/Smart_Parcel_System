import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token'); // your JWT
        if (!token) {
          setError('You must be logged in to view orders');
          setLoading(false);
          return;
        }
    
        const res = await axios.get('http://localhost:5000/api/orders/userOrders', {
          headers: {
            Authorization: token,
          },
        });

        setTrips(res.data.orders || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div
      className="d-flex flex-column vh-100 bg-light"
      style={{ padding: '15px' }}
    >
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center p-3 mb-3 rounded"
        style={{ backgroundColor: '#e8eaff' }}
      >
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-box-seam fs-3 text-primary"></i>
          <span className="fs-4 fw-semibold">Samaan</span>
        </div>

        <div
          className="d-flex align-items-center gap-2 fw-semibold"
          aria-label="User Info"
        >
          Dashboard <i className="bi bi-person-circle fs-4"></i>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 bg-white rounded shadow p-4 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h3 className="fw-bold mb-2 mb-md-0">Your Orders</h3>
        </div>

        {/* Loading */}
        {loading && <p>Loading orders...</p>}

        {/* Error */}
        {error && <p className="text-danger">{error}</p>}

        {/* Table */}
        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover table-bordered rounded mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Agent</th>
                  <th scope="col">Source</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {trips.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  trips.map((trip, idx) => (
                    <tr key={trip._id || idx}>
                      <th scope="row">{idx + 1}</th>
                      <td>{trip.agentId?.name || 'Not assigned'}</td>
                      <td>{trip.from}</td>
                      <td>{trip.to}</td>
                      <td>{trip.status}</td>
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