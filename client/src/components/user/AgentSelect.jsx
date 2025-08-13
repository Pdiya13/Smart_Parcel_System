import React, { useState } from 'react';

const cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
];

export default function AgentSelect() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!fromCity || !toCity || !date || !weight) {
      alert('Please fill in all fields including date and weight');
      return;
    }
    alert(
      `Searching parcel from ${fromCity} to ${toCity} on ${date} with weight ${weight} kg`
    );
  };

  return (
    <div
      className="d-flex flex-column vh-100 bg-light"
      style={{ padding: '15px', maxWidth: '400px', margin: '0 auto' }}
    >
      <h2 className="mb-4 text-center fw-bold">User Parcel Delivery Dashboard</h2>

      <form onSubmit={handleSearch} className="d-flex flex-column gap-3 flex-grow-1">
        {/* From City */}
        <div>
          <label htmlFor="fromCity" className="form-label fw-semibold">
            From:
          </label>
          <select
            id="fromCity"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="form-select"
            aria-label="Select From City"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={`from-${city}`} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* To City */}
        <div>
          <label htmlFor="toCity" className="form-label fw-semibold">
            To:
          </label>
          <select
            id="toCity"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="form-select"
            aria-label="Select To City"
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={`to-${city}`} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="form-label fw-semibold">
            Date:
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
            aria-label="Select Date"
            required
          />
        </div>

        {/* Weight */}
        <div>
          <label htmlFor="weight" className="form-label fw-semibold">
            Weight (kg):
          </label>
          <input
            id="weight"
            type="number"
            min="0"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            className="form-control"
            aria-label="Enter Weight"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100 mt-auto">
          Search Agent
        </button>
      </form>
    </div>
  );
}
