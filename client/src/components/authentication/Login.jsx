import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import { jwtDecode } from 'jwt-decode';

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

        const loginUrl = role === 'user' ? 'http://localhost:8080/api/auth/user/login' : 'http://localhost:8080/api/auth/vendor/login';

        try {
            const res = await axios.post(loginUrl, {
                email,
                password
            });

            if (res.data.status === false) {
                throw new Error("Invalid credentials");
            }

            localStorage.setItem('token', res.data.token);
            console.log("Login successful");
            if (role === 'user') {
                navigate('/dashboard');
            } else if (role === 'vendor') {
                navigate('/vendor-dashboard');
            } else {
                navigate('/login');
            }
        } catch (err) {
            toast.error('Invalid User or Password');
            console.error('Login error:', err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-800 via-black to-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-gray-800 to-black text-white px-8 py-10 rounded-xl shadow-xl w-full max-w-md"
            >
                <h2 className="text-3xl font-semibold mb-6 text-center tracking-wide">LOGIN</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <div className="mb-4">
                    <label className="block mb-2 text-sm text-gray-300">Select Role:</label>
                    <div className="flex items-center space-x-6">
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="user"
                                checked={formData.role === 'user'}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="mr-2"
                            />
                            User
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="vendor"
                                checked={formData.role === 'vendor'}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="mr-2"
                            />
                            Vendor
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-slate-700 hover:bg-slate-800 transition duration-300 font-bold py-2 rounded"
                >
                    Login
                </button>

                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline font-semibold">
                        SignUp
                    </Link>
                </p>
            </form>
        </div>
    );
}
