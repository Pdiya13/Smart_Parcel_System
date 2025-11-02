import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!token) {
    return (
      <header className="navbar navbar-light bg-light shadow-sm px-4">
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-box-seam fs-3 text-primary"></i>
          <span className="navbar-brand fw-bold text-primary fs-4">Samaan</span>
        </div>
        <Link to="/login" className="btn btn-primary btn-sm">
          Login
        </Link>
      </header>
    );
  }

  if (role === "agent") {
    return (
      <header
        className="d-flex justify-content-between align-items-center p-3 mb-4 rounded shadow-sm"
        style={{ backgroundColor: "#e8eaff" }}
      >
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-box-seam fs-3 text-primary"></i>
          <span
            className="fs-4 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/agentdashboard")}
          >
            Samaan
          </span>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center gap-2 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/agentdashboard")}
          >
            <i className="bi bi-speedometer2 fs-5"></i>
            <span className="d-none d-md-inline">Dashboard</span>
          </div>

          <div
            className="d-flex align-items-center gap-2 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/findoptimalpath")}
          >
            <i className="bi bi-signpost-split fs-5"></i>
            <span className="d-none d-md-inline">Find Path</span>
          </div>

          <div
            className="d-flex align-items-center gap-2 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/agenthistory")}
          >
            <i className="bi bi-clock-history fs-5"></i>
            <span className="d-none d-md-inline">History</span>
          </div>

          <div
            className="d-flex align-items-center gap-2 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/carrierprofile")}
          >
            <i className="bi bi-person-circle fs-5"></i>
            <span className="d-none d-md-inline">Profile</span>
          </div>

          <button
            className="btn btn-outline-danger btn-sm ms-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
    );
  }

  if (role === "user") {
    return (
      <header
        className="d-flex justify-content-between align-items-center p-3 mb-4 rounded shadow-sm"
        style={{ backgroundColor: "#e8eaff" }}
      >
        <div className="d-flex align-items-center gap-2">
          <i className="bi bi-box-seam fs-3 text-primary"></i>
          <span
            className="fs-4 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            Samaan
          </span>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center gap-2 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-speedometer2 fs-5"></i>
            <span className="d-none d-md-inline">Dashboard</span>
          </div>

          <div
            className="d-flex align-items-center gap-2 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/selectcarrier")}
          >
            <i className="bi bi-truck fs-5"></i>
            <span className="d-none d-md-inline">Select Carrier</span>
          </div>

          <div
            className="d-flex align-items-center gap-2 fw-semibold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/userprofile")}
          >
            <i className="bi bi-person-circle fs-5"></i>
            <span className="d-none d-md-inline">Profile</span>
          </div>

          <button
            className="btn btn-outline-danger btn-sm ms-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
    );
  }

  return null;
};

export default Header;
