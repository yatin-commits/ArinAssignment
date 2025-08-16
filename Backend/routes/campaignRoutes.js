const express = require("express");
const { listCampaigns, createCampaign } = require("../controllers/campaignController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware); 

router.get("/", listCampaigns);
router.post("/", createCampaign);
router.put("/:id", updateCampaign);    
router.delete("/:id", deleteCampaign); 

module.exports = router;
