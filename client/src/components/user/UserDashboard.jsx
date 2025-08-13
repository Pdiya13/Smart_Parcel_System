import React from 'react';

const UserDashboard = () => {
  // Empty trips data example
  const trips = [];

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="#4f46e5"
            className="bi bi-box-seam"
            viewBox="0 0 16 16"
            aria-label="Logo"
            role="img"
          >
            <path d="M8.387 1.447a.5.5 0 0 0-.774 0L1.528 7.672a.5.5 0 0 0 .103.803l6.39 3.87a.5.5 0 0 0 .478 0l6.39-3.87a.5.5 0 0 0 .103-.803L8.387 1.447zM2.56 8.84 8 12.694l5.44-3.853-4.64-2.813-3.502 2.122-1.738-1.03z" />
            <path d="M7.5 2.577v7.657l-6.002-3.631 6.002-4.026zM8.5 2.577l6.002 3.63-6.002 4.026V2.577z" />
          </svg>
          <span className="fs-4 fw-semibold">Samaan</span>
        </div>

        <div
          className="d-flex align-items-center gap-2 fw-semibold"
          aria-label="User Info"
        >
          B1_CE091_Eva Raste{' '}
          <i className="bi bi-person-circle fs-4" aria-hidden="true"></i>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow-1 bg-white rounded shadow p-4 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <h3 className="fw-bold mb-2 mb-md-0">Your Selected Trips</h3>
          <button type="button" className="btn btn-primary">
            Your Chats
          </button>
        </div>

        {/* Responsive table wrapper */}
        <div className="table-responsive">
          <table className="table table-hover table-bordered rounded mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Agent</th>
                <th scope="col">Source</th>
                <th scope="col">Destination</th>
                <th scope="col">Status</th>
                <th scope="col">Rating &amp; Feedback</th>
              </tr>
            </thead>
            <tbody>
              {trips.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No trips found.
                  </td>
                </tr>
              ) : (
                trips.map((trip, idx) => (
                  <tr key={trip.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>{trip.agent}</td>
                    <td>{trip.source}</td>
                    <td>{trip.destination}</td>
                    <td>{trip.status}</td>
                    <td>{trip.ratingFeedback}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav aria-label="Trips Pagination" className="mt-3">
          <ul className="pagination justify-content-center flex-wrap">
            <li className="page-item disabled">
              <button className="page-link" tabIndex="-1" aria-disabled="true">
                Prev
              </button>
            </li>
            <li className="page-item active" aria-current="page">
              <span className="page-link">
                1 <span className="visually-hidden">(current)</span>
              </span>
            </li>
            <li className="page-item">
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      </main>
    </div>
  );
};

export default UserDashboard;
