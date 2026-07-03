import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function SamaanHomepage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  const handleLogout = () => setUser(null);

  return (
    <div className="bg-mesh min-vh-100 d-flex flex-column">
      <header className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm">
        <div className="container d-flex justify-content-between align-items-center py-2">
          <div
            className="d-flex align-items-center gap-2 text-decoration-none fade-in-up"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <h1 className="fs-3 fw-bold text-gradient mb-0">Samaan</h1>
          </div>

          <div className="fade-in-up delay-100">
            {user ? (
              <>
                <span className="me-3 text-secondary fw-semibold">
                  Hello, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="btn btn-outline-primary me-2"
                >
                  Login
                </button>
                <button
                  onClick={handleSignup}
                  className="btn btn-primary shadow-sm"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container flex-grow-1 py-5">
        <div className="row align-items-center min-vh-50">
          <div className="col-md-6 fade-in-up delay-200">
            <h2 className="display-4 fw-bold text-dark mb-3 lh-sm">
              Widespread Network With{" "}
              <span className="text-gradient bg-white px-3 py-1 rounded-3 shadow-sm d-inline-block mt-2">
                Seamless Integration
              </span>
            </h2>
            <p className="lead text-secondary mb-4 fs-5">
              Delivering your consignment and trust across cities — fast,
              reliable, and secure.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary btn-lg px-4"
              >
                Find a Carrier
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="btn btn-outline-primary btn-lg px-4"
              >
                Become a Carrier
              </button>
            </div>

            <div className="row mt-5 pt-3">
              <div className="col text-center border-end">
                <h3 className="text-primary fw-bold display-6 mb-0">500+</h3>
                <p className="text-muted fw-medium text-uppercase small tracking-wide">Active Travelers</p>
              </div>
              <div className="col text-center border-end">
                <h3 className="text-primary fw-bold display-6 mb-0">1K+</h3>
                <p className="text-muted fw-medium text-uppercase small tracking-wide">Deliveries Made</p>
              </div>
              <div className="col text-center">
                <h3 className="text-primary fw-bold display-6 mb-0">50+</h3>
                <p className="text-muted fw-medium text-uppercase small tracking-wide">Cities Covered</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 text-center mt-5 mt-md-0 fade-in-up delay-300">
            <div className="card border-0 p-5 rounded-4 shadow-lg d-flex align-items-center justify-content-center">
              <p className="text-primary fw-semibold mb-4 fs-5">
                📦 Your smart parcel journey starts here.
              </p>
              <img
               src="/img.jpg" 
                alt="Delivery Illustration"
                className="img-fluid rounded-3 shadow-sm"
                style={{ maxWidth: "300px", transition: "transform 0.3s ease" }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </div>
          </div>
        </div>
      </main>

      <section className="py-5" style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(10px)" }}>
        <div className="container text-center py-4">
          <h3 className="fw-bold mb-5 display-5 text-dark fade-in-up">How It Works</h3>
          <div className="row g-4">
            {[
              {
                step: "1",
                title: "Post Your Package",
                desc: "Share details about what you want to send and where it needs to go.",
                icon: "bi-box-seam"
              },
              {
                step: "2",
                title: "Connect with Travelers",
                desc: "Get matched with verified travelers heading to your destination.",
                icon: "bi-people"
              },
              {
                step: "3",
                title: "Track & Receive",
                desc: "Track your package in real-time and receive it safely at your doorstep.",
                icon: "bi-geo-alt"
              },
            ].map((item, i) => (
              <div key={i} className={`col-md-4 fade-in-up delay-${(i + 1) * 100}`}>
                <div className="card h-100 p-4">
                  <div className="card-body">
                    <div 
                      className="rounded-circle bg-primary bg-opacity-10 text-primary mx-auto d-flex align-items-center justify-content-center mb-4" 
                      style={{ width: "80px", height: "80px", transition: "all 0.3s ease" }}
                      onMouseOver={(e) => {
                        e.currentTarget.classList.remove('bg-opacity-10');
                        e.currentTarget.classList.add('bg-primary', 'text-white', 'shadow');
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.classList.add('bg-opacity-10');
                        e.currentTarget.classList.remove('bg-primary', 'text-white', 'shadow');
                      }}
                    >
                      <i className={`bi ${item.icon} fs-1`}></i>
                    </div>
                    <h5 className="fw-bold fs-4 mb-3">{item.title}</h5>
                    <p className="text-muted fs-6 lh-lg">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
