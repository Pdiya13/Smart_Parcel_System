import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    role: 'user',
    city: '',
  });

  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await axios.get('http://localhost:8080/api/auth/agent/allowedCities');
        if (res.data && res.data.cities) {
          setCities(res.data.cities);
        }
      } catch (err) {
        console.error('Failed to fetch cities', err);
      }
    }
    fetchCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (formData.role === 'user') {
        res = await axios.post('http://localhost:8080/api/auth/user/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        });
      } else {
        res = await axios.post('http://localhost:8080/api/auth/agent/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNo: formData.phoneNo,
          city: formData.city,
          role: formData.role,
        });
      }

      if (res.data.status) {
        toast.success(res.data.message);
        navigate('/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 to-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-800 to-black text-white px-8 py-10 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">SIGN UP</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="mb-6 flex items-center justify-center gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="user"
              checked={formData.role === 'user'}
              onChange={handleChange}
              className="accent-blue-500"
            />
            User
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="role"
              value="agent"
              checked={formData.role === 'agent'}
              onChange={handleChange}
              className="accent-blue-500"
            />
            Agent
          </label>
        </div>

        {formData.role === 'agent' && (
          <>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              required
            >
              <option value="" disabled>Select City</option>
              {cities.map(city => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <input
              type="tel"
              name="phoneNo"
              placeholder="Phone Number"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full mb-6 px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-slate-700 hover:bg-slate-800 transition duration-300 font-bold py-2 rounded"
        >
          Register
        </button>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}