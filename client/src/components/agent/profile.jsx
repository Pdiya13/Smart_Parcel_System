import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CarrierProfile = () => {
  const [agent, setAgent] = useState(null);
  const [formData, setFormData] = useState({ name: "", phoneNo: "", city: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("http://localhost:8080/api/profile/agent", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAgent(res.data.agent);
        setFormData({
          name: res.data.agent.name,
          phoneNo: res.data.agent.phoneNo,
          city: res.data.agent.city,
          email: res.data.agent.email,
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8080/api/profile/agent",
        { name: formData.name, phoneNo: formData.phoneNo, city: formData.city },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAgent(res.data.agent);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.response?.data?.message || err.message);
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  if (!agent) return <div className="text-center text-gray-600 mt-8">Loading...</div>;

  return (
    <div className="flex flex-col items-center mt-6">
      <button
        onClick={() => navigate("/agentDashboard")}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition"
      >
        Go to Dashboard
      </button>

      <div className="w-full max-w-sm bg-white shadow-md rounded-xl p-4">
        <h2 className="text-xl font-semibold text-center text-blue-600 mb-2">Carrier Profile</h2>

        {!editMode ? (
          <div className="space-y-2 text-sm">
            <p><strong>Name:</strong> {agent.name}</p>
            <p><strong>Email:</strong> {agent.email}</p>
            <p><strong>Phone:</strong> {agent.phoneNo}</p>
            <p><strong>City:</strong> {agent.city}</p>

            <div className="flex flex-col space-y-4 mt-2">
              <button
                onClick={() => setEditMode(true)}
                className="w-full bg-blue-500 text-white py-1.5 rounded-lg text-sm hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={handleLogout}
                className="m-2 w-full bg-red-500 text-white py-1.5 rounded-lg text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
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
              name="phoneNo"
              placeholder="Phone"
              value={formData.phoneNo}
              onChange={handleChange}
              className="w-full border rounded-md px-2 py-1"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-md px-2 py-1"
            />

            <div className="flex gap-4 mt-2">
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

export default CarrierProfile;