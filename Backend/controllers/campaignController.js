const { getCampaigns, addCampaign } = require("../models/CampaignModel");

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
const updateCampaign = async (req, res) => {
  const campaignId = req.params.id;
  const userId = req.user.id;
  const { campaign_name, date, impressions, clicks, conversions } = req.body;

  try {
    const sql = `
      UPDATE campaigns
      SET campaign_name = ?, date = ?, impressions = ?, clicks = ?, conversions = ?
      WHERE id = ? AND user_id = ?
    `;
    db.query(
      sql,
      [campaign_name, date, impressions, clicks, conversions, campaignId, userId],
      (err, results) => {
        if (err) return res.status(500).json({ message: "Failed to update campaign" });
        if (results.affectedRows === 0)
          return res.status(404).json({ message: "Campaign not found or not authorized" });
        res.json({ message: "Campaign updated successfully" });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
const deleteCampaign = async (req, res) => {
  const campaignId = req.params.id;
  const userId = req.user.id;

  try {
    const sql = "DELETE FROM campaigns WHERE id = ? AND user_id = ?";
    db.query(sql, [campaignId, userId], (err, results) => {
      if (err) return res.status(500).json({ message: "Failed to delete campaign" });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "Campaign not found or not authorized" });
      res.json({ message: "Campaign deleted successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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

module.exports = { listCampaigns, createCampaign };
