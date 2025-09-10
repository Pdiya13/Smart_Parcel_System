import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    const loginUrl =
      role === 'user'
        ? 'http://localhost:8080/api/auth/user/login'
        : 'http://localhost:8080/api/auth/agent/login';

    try {
      const res = await axios.post(loginUrl, {
        email,
        password,
      });

      if (res.data.status === false) {
        throw new Error('Invalid credentials');
      }

      localStorage.setItem('token', res.data.token);
      console.log('Login successful');
      if (role === 'user') {
        navigate('/dashboard');
      } else if (role === 'agent') {
        navigate('/agentDashboard');
      } else {
        navigate('/login');
      }
    } catch (err) {
      toast.error('Invalid User or Password');
      console.error('Login error:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      style={{ background: 'linear-gradient(135deg, #000000, #434343)' }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-dark text-white p-5 rounded shadow"
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <h2 className="mb-4 text-center">LOGIN</h2>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>

        <fieldset className="mb-3">
          <legend className="col-form-label pt-0 text-white">Select Role:</legend>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="roleUser"
              value="user"
              checked={formData.role === 'user'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
            <label className="form-check-label" htmlFor="roleUser">
              User
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="roleAgent"
              value="agent"
              checked={formData.role === 'agent'}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            />
            <label className="form-check-label" htmlFor="roleAgent">
              Agent
            </label>
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>

        <p className="mt-3 text-center text-white-50">
          Don't have an account?{' '}
          <Link to="/signup" className="text-info text-decoration-none">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
