import React, { useState } from 'react';


const ProfilePage = () => {
  const [user, setUser] = useState({
    fullName: 'B1_CE089_DIYA PATEL',
    role: 'Carrier',
    email: '23ceuos108@ddu.ac.in',
    phone: '',
    address: '',
    walletBalance: 0,
  });


  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });


  const handleEditClick = () => setIsEditing(true);
  const handleInputChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };


  const initial = user.fullName.charAt(0).toUpperCase();


  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      {/* Header banner */}
      <div className="bg-primary" style={{ height: '112px' }}></div>


      {/* Avatar circle */}
      <div
        className="position-relative rounded-circle bg-primary text-white d-flex align-items-center justify-content-center border border-white"
        style={{
          width: '80px',
          height: '80px',
          top: '-40px',
          left: '30px',
          fontSize: '2.5rem',
          fontWeight: '700',
          zIndex: 1,
        }}
      >
        {initial}
      </div>


      {/* Content */}
      <div className="bg-white rounded shadow p-4 mt-n4">
        {/* Name and role */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className="h4 mb-0">{user.fullName}</h2>
          {!isEditing ? (
            <button
              onClick={handleEditClick}
              className="btn btn-primary"
              type="button"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="btn btn-success"
              type="button"
            >
              Save
            </button>
          )}
        </div>
        <p className="text-muted">{user.role}</p>


        {/* Form fields */}
        <form>
          {[
            { label: 'Full Name', name: 'fullName', icon: '👤' },
            { label: 'Email', name: 'email', icon: '📧' },
            { label: 'Phone', name: 'phone', icon: '📞' },
            { label: 'Address', name: 'address', icon: '📍' },
          ].map(({ label, name, icon }) => (
            <div className="mb-3 d-flex align-items-center gap-3" key={name}>
              <span style={{ fontSize: '1.5rem' }}>{icon}</span>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder={label}
                className={`form-control ${!isEditing ? 'bg-light' : ''}`}
              />
            </div>
          ))}
        </form>


        {/* Wallet section */}
        <div className="border rounded bg-light p-3 mt-4">
          <h5 className="d-flex align-items-center mb-3">
            <span className="me-2">💼</span> Wallet
          </h5>
          <p className="text-warning small mb-3">
            ⚠️ These transactions are dummy and for testing purposes only.
          </p>
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <div>
              <div className="fw-semibold">Available Balance:</div>
              <div className="text-success fw-bold fs-4">
                ₹ {user.walletBalance}
              </div>
            </div>
            <input
              type="text"
              placeholder="yourname@upi"
              className="form-control"
              style={{ maxWidth: '180px' }}
            />
            <button
              disabled={user.walletBalance <= 0}
              className={`btn ${
                user.walletBalance > 0 ? 'btn-primary' : 'btn-secondary'
              }`}
              type="button"
            >
              Withdraw ₹{user.walletBalance}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default ProfilePage;




