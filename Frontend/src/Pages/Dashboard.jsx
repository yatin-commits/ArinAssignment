import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState("");
  const [newCampaign, setNewCampaign] = useState({
    campaign_name: "",
    date: "",
    impressions: "",
    clicks: "",
    conversions: "",
  });
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/campaigns?name=${filter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCampaigns(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch campaigns");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [filter]);

  const handleInputChange = (e) => {
    setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
  };

  const handleAddCampaign = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/campaigns", newCampaign, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCampaign({
        campaign_name: "",
        date: "",
        impressions: "",
        clicks: "",
        conversions: "",
      });
      fetchCampaigns();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add campaign");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <input
        type="text"
        placeholder="Filter by campaign name..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-6 px-3 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      
      <form
        onSubmit={handleAddCampaign}
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-5 gap-3"
      >
        <input
          type="text"
          name="campaign_name"
          placeholder="Campaign Name"
          value={newCampaign.campaign_name}
          onChange={handleInputChange}
          required
          className="border px-2 py-1 rounded"
        />
        <input
          type="date"
          name="date"
          value={newCampaign.date}
          onChange={handleInputChange}
          required
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          name="impressions"
          placeholder="Impressions"
          value={newCampaign.impressions}
          onChange={handleInputChange}
          required
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          name="clicks"
          placeholder="Clicks"
          value={newCampaign.clicks}
          onChange={handleInputChange}
          required
          className="border px-2 py-1 rounded"
        />
        <input
          type="number"
          name="conversions"
          placeholder="Conversions"
          value={newCampaign.conversions}
          onChange={handleInputChange}
          required
          className="border px-2 py-1 rounded"
        />
        <button
          type="submit"
          className="col-span-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
        >
          Add Campaign
        </button>
      </form>

      {/* Error */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Campaign Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Impressions</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Clicks</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Conversions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {campaigns.map((c) => (
              <tr key={c.id}>
                <td className="px-4 py-2">{c.campaign_name}</td>
                <td className="px-4 py-2">{c.date}</td>
                <td className="px-4 py-2">{c.impressions}</td>
                <td className="px-4 py-2">{c.clicks}</td>
                <td className="px-4 py-2">{c.conversions}</td>
              </tr>
            ))}
            {campaigns.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  No campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
