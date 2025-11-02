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
    <div className="bg-light min-vh-100 d-flex flex-column">
      <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container d-flex justify-content-between align-items-center py-2">
          <div
            className="d-flex align-items-center gap-2 text-decoration-none"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={logo}
              alt="Samaan Logo"
              width="45"
              height="45"
              className="rounded shadow-sm"
            />
            <h1 className="fs-3 fw-bold text-primary mb-0">Samaan</h1>
          </div>

          <div>
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
                  className="btn btn-primary"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container flex-grow-1 py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="display-5 fw-bold text-dark mb-3">
              Widespread Network With{" "}
              <span className="text-primary bg-light px-2 rounded">
                Seamless Integration
              </span>
            </h2>
            <p className="lead text-secondary mb-4">
              Delivering your consignment and trust across cities — fast,
              reliable, and secure.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary btn-lg"
              >
                Find a Carrier
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="btn btn-outline-primary btn-lg"
              >
                Become a Carrier
              </button>
            </div>

            <div className="row mt-5">
              <div className="col text-center">
                <h3 className="text-primary fw-bold">500+</h3>
                <p className="text-muted">Active Travelers</p>
              </div>
              <div className="col text-center">
                <h3 className="text-primary fw-bold">1000+</h3>
                <p className="text-muted">Deliveries Made</p>
              </div>
              <div className="col text-center">
                <h3 className="text-primary fw-bold">50+</h3>
                <p className="text-muted">Cities Covered</p>
              </div>
            </div>
          </div>

          <div className="col-md-6 text-center mt-4 mt-md-0">
            <div className="bg-light p-5 rounded-4 shadow-sm">
              <p className="text-primary fw-semibold mb-3">
                📦 Your smart parcel journey starts here.
              </p>
              <img
                src="https://illustrations.popsy.co/gray/delivery.svg"
                alt="Delivery Illustration"
                className="img-fluid"
                style={{ maxWidth: "300px" }}
              />
            </div>
          </div>
        </div>
      </main>

      <section className="bg-white border-top py-5">
        <div className="container text-center">
          <h3 className="fw-bold mb-5 display-6 text-dark">How It Works</h3>
          <div className="row g-4">
            {[
              {
                step: "1",
                title: "Post Your Package",
                desc: "Share details about what you want to send and where it needs to go.",
              },
              {
                step: "2",
                title: "Connect with Travelers",
                desc: "Get matched with verified travelers heading to your destination.",
              },
              {
                step: "3",
                title: "Track & Receive",
                desc: "Track your package in real-time and receive it safely at your doorstep.",
              },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <div className="rounded-circle bg-primary bg-opacity-10 text-primary fw-bold fs-4 mx-auto d-flex align-items-center justify-content-center mb-3" style={{ width: "60px", height: "60px" }}>
                      {item.step}
                    </div>
                    <h5 className="fw-semibold">{item.title}</h5>
                    <p className="text-muted">{item.desc}</p>
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
