import React, { useState } from "react";
import axios from "axios";
import EmiResult from "@/components/emiresult";
import ThemeToggle from "@/components/ThemeToggle";
import EMIForm from "@/components/EMIForm";
import ErrorDisplay from "@/components/ErrorDisplay";
import PageTitle from "@/components/PageTitle";
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
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
    <div className={`min-h-screen py-8 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'
    }`}>
      <div className="w-full container mx-auto p-6">
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <PageTitle isDarkMode={isDarkMode} />
        <EMIForm 
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isDarkMode={isDarkMode}
        />
        <ErrorDisplay error={error} isDarkMode={isDarkMode} />
        {response && <EmiResult data={response} isDarkMode={isDarkMode} />}
      </div>
    </div>
  );
};

export default EmiCalculator;
