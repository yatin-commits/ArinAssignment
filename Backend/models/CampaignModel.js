import db from "../config/db.js";

const getCampaigns = (userId, filter) => {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM campaigns WHERE user_id = ?";
    const params = [userId];
    if (filter) {
      sql += " AND campaign_name LIKE ?";
      params.push(`%${filter}%`);
    }
    db.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const addCampaign = (data, userId) => {
  const { campaign_name, date, impressions, clicks, conversions } = data;
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO campaigns (campaign_name, date, impressions, clicks, conversions, user_id) VALUES (?, ?, ?, ?, ?, ?)",
      [campaign_name, date, impressions, clicks, conversions, userId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

const updateCampaign = (data, campaignId, userId) => {
  const { campaign_name, date, impressions, clicks, conversions } = data;
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE campaigns SET campaign_name = ?, date = ?, impressions = ?, clicks = ?, conversions = ? WHERE id = ? AND user_id = ?",
      [campaign_name, date, impressions, clicks, conversions, campaignId, userId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

const deleteCampaign = (campaignId, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM campaigns WHERE id = ? AND user_id = ?",
      [campaignId, userId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

export { getCampaigns, addCampaign, updateCampaign, deleteCampaign };