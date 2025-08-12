
import React from 'react';


const CarrierDashboard = () => {
  const summary = [
    { title: 'Total Destinations', value: 0, icon: '📍' },
    { title: 'Upcoming Trips', value: 0, icon: '📅' },
    { title: 'Completed Trips', value: 0, icon: '💲' },
    { title: 'Pending Trips', value: 0, icon: '📦' },
  ];


  const trips = [];


  return (
    <div className="min-vh-100 p-4 bg-light font-monospace">
      {/* Header */}
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


      {/* Summary Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 mb-5">
        {summary.map(({ title, value, icon }) => (
          <div key={title} className="col">
            <div className="d-flex align-items-center gap-3 p-3 bg-white rounded shadow-sm">
              <div
                className="d-flex justify-content-center align-items-center bg-primary text-white rounded-circle"
                style={{ width: '40px', height: '40px', fontSize: '1.5rem' }}
              >
                {icon}
              </div>
              <div>
                <p className="mb-1 text-secondary small">{title}</p>
                <h3 className="mb-0">{value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>


      {/* Trips Table */}
      <section className="bg-white rounded shadow-sm p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fs-5 fw-semibold m-0">Your Trips</h3>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-primary">
              Chats
            </button>
            <button type="button" className="btn btn-primary">
              Add New Trip
            </button>
          </div>
        </div>


        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              {[
                'ID',
                'SOURCE',
                'DESTINATION',
                'DATE',
                'CAPACITY',
                'STATUS',
              ].map((header) => (
                <th key={header} scope="col" className="text-start">
                  {header}
                </th>
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
                <tr key={trip.id}>
                  <td>{trip.id}</td>
                  <td>{trip.source}</td>
                  <td>{trip.destination}</td>
                  <td>{trip.date}</td>
                  <td>{trip.capacity}</td>
                  <td>{trip.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};


export default CarrierDashboard;






