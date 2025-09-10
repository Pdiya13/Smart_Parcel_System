import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/profile/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setFormData({
          name: res.data.user.name,
          phone: res.data.user.phone,
          address: res.data.user.address,
          email: res.data.user.email,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/api/profile/user",
        { name: formData.name, phone: formData.phone, address: formData.address },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      setEditMode(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.response?.data?.message || err.message);
      setMessage("Failed to update profile.");
    }
  };

  if (!user) return <div className="text-center text-gray-600 mt-8">Loading...</div>;

  return (
    <div className="flex flex-col items-center mt-6">
      {/* ✅ Go to Dashboard Button at the Top */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
      >
        Go to Dashboard
      </button>

      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-semibold text-center text-blue-600 mb-2">User Profile</h2>

        {message && <p className="text-center text-green-600 mb-2 text-sm">{message}</p>}

        {!editMode ? (
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>

            {/* Edit Button */}
            <button
              onClick={() => setEditMode(true)}
              className="w-full bg-blue-500 text-white py-1.5 rounded-lg text-sm hover:bg-blue-600 transition"
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="space-y-3 text-sm">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-2 py-1"
            />
            <input
              type="text"
              name="email"
              value={formData.email}
              disabled
              className="w-full border rounded-md px-2 py-1 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-2 py-1"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-md px-2 py-1"
            />

            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-green-500 text-white py-1.5 rounded-lg hover:bg-green-600 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="flex-1 bg-gray-400 text-white py-1.5 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;