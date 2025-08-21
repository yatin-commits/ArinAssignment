import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "../config";

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
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const token = localStorage.getItem("token");

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/campaigns?name=${filter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCampaigns(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch campaigns");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [filter, token]);

  const handleInputChange = (e) => {
    setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    } else {
      toast.error("Please select a valid image file");
      setSelectedImage(null);
    }
  };

  const handleAddCampaign = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/campaigns`, newCampaign, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewCampaign({
        campaign_name: "",
        date: "",
        impressions: "",
        clicks: "",
        conversions: "",
      });
      setSelectedImage(null);
      await fetchCampaigns();
      toast.success("Campaign added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add campaign");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_BASE_URL}/campaigns/${editingCampaign.id}`,
        newCampaign,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingCampaign(null);
      setNewCampaign({
        campaign_name: "",
        date: "",
        impressions: "",
        clicks: "",
        conversions: "",
      });
      setSelectedImage(null);
      await fetchCampaigns();
      toast.success("Campaign updated successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update campaign");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCampaigns();
      toast.success("Campaign deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete campaign");
    }
  };

  const handleImageSubmit = () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    const imageUrl = URL.createObjectURL(selectedImage);
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
      <html>
        <head>
          <title>Image Preview</title>
          <style>
            html, body {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100vh;
              overflow: hidden;
              background: #000;
              display: flex;
              justify-content: center;
              align-items: center;
              position: relative;
            }
            #imageContainer {
              position: relative;
              width: 100vw;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            #image {
              width: 100vw;
              height: 100vh;
              object-fit: contain;
              display: block;
            }
            #likeContainer {
              position: absolute;
              top: 50%;
              right: 20px;
              transform: translateY(-50%);
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 10px;
              background: rgba(0, 0, 0, 0.7);
              padding: 10px;
              border-radius: 10px;
              z-index: 1000;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            #likeBtn {
              padding: 8px;
              background: #ff4d4f;
              color: white;
              border: none;
              border-radius: 50%;
              cursor: pointer;
              font-size: 20px;
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              transition: background 0.2s;
            }
            #likeBtn:hover {
              background: #e6393d;
            }
            #likeBtn::before {
              content: '❤️';
              font-size: 24px;
            }
            #likeCount {
              color: white;
              font-size: 16px;
              font-family: Arial, sans-serif;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div id="imageContainer">
            <img id="image" src="${imageUrl}" alt="Selected Image" />
            <div id="likeContainer">
              <button id="likeBtn"></button>
              <span id="likeCount">0</span>
            </div>
          </div>
          <script>
            let likeCount = 0;
            const likeBtn = document.getElementById('likeBtn');
            const likeCountDisplay = document.getElementById('likeCount');
            const imageContainer = document.getElementById('imageContainer');
            likeBtn.addEventListener('click', () => {
              likeCount++;
              likeCountDisplay.textContent = likeCount;
              if (imageContainer.requestFullscreen) {
                imageContainer.requestFullscreen();
              } else if (imageContainer.webkitRequestFullscreen) {
                imageContainer.webkitRequestFullscreen();
              } else if (imageContainer.msRequestFullscreen) {
                imageContainer.msRequestFullscreen();
              }
            });
            document.getElementById('image').onerror = () => {
              alert('Failed to load the image. Please try again.');
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    newWindow.document.close();
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

      <div
        className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-6 gap-3"
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
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border px-2 py-1 rounded"
        />
        <div className="col-span-full flex gap-2">
          <button
            type="button"
            onClick={editingCampaign ? handleUpdate : handleAddCampaign}
            className={`flex-1 py-2 rounded font-semibold text-white ${
              editingCampaign
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {editingCampaign ? "Update Campaign" : "Add Campaign"}
          </button>
          <button
            type="button"
            onClick={handleImageSubmit}
            className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded font-semibold"
          >
            Submit Image
          </button>
          {editingCampaign && (
            <button
              type="button"
              onClick={() => {
                setEditingCampaign(null);
                setNewCampaign({
                  campaign_name: "",
                  date: "",
                  impressions: "",
                  clicks: "",
                  conversions: "",
                });
                setSelectedImage(null);
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Impressions</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Clicks</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Conversions</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
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
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {campaigns.length === 0 && (
              <tr>
                <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
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