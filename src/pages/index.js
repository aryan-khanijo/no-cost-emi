import React, { useState } from "react";
import axios from "axios";
import EmiResult from "@/components/emiresult";
import "@/styles/globals.css";

const EmiCalculator = () => {
  const [formData, setFormData] = useState({
    price: 55899,
    roi: 14,
    numoi: 12,
    nocostemi: true,
    fee: 199,
  });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/emicalc", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setResponse(res.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch EMI data.");
      console.error(err);
    }
  };

  return (
    <div className="w-full container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        EMI Calculator
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 w-full"
      >
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border-gray-300 text-gray-900 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Interest (%):</label>
            <input
              type="number"
              name="roi"
              value={formData.roi}
              onChange={handleChange}
              className="w-full border-gray-300 text-gray-900 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Installments:</label>
            <input
              type="number"
              name="numoi"
              value={formData.numoi}
              onChange={handleChange}
              className="w-full border-gray-300 text-gray-900 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Processing Fee:</label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              className="w-full border-gray-300 text-gray-900 rounded-md p-2"
            />
          </div>
          <div className="col-span-2 flex items-center">
            <input
              type="checkbox"
              name="nocostemi"
              checked={formData.nocostemi}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">No Cost EMI</label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Calculate EMI
        </button>
      </form>

      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}

      {response && <EmiResult data={response} />}
    </div>
  );
};

export default EmiCalculator;
