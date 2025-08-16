import { getCampaigns, addCampaign, updateCampaign, deleteCampaign } from "../models/CampaignModel.js";

const listCampaigns = async (req, res) => {
  const userId = req.user.id;
  const filter = req.query.name || "";

  try {
    const campaigns = await getCampaigns(userId, filter);
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};
const updateCampaignHandler = async (req, res) => {
  const campaignId = req.params.id;
  const userId = req.user.id;
  const { campaign_name, date, impressions, clicks, conversions } = req.body;

  try {
    const result = await updateCampaign({ campaign_name, date, impressions, clicks, conversions }, campaignId, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Campaign not found or unauthorized" });
    }
    res.json({ message: "Campaign updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const deleteCampaignHandler = async (req, res) => {
  const campaignId = req.params.id;
  const userId = req.user.id;

  try {
    const result = await deleteCampaign(campaignId, userId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Campaign not found or unauthorized" });
    }
    res.json({ message: "Campaign deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete campaign" });
  }
};


const createCampaign = async (req, res) => {
  const userId = req.user.id;
  const data = req.body;

  try {
    await addCampaign(data, userId);
    res.status(201).json({ message: "Campaign added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add campaign" });
  }
};

export { listCampaigns, createCampaign, deleteCampaignHandler as deleteCampaign, updateCampaignHandler as updateCampaign };
