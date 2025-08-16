import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { listCampaigns, createCampaign, updateCampaign, deleteCampaign } from "../controllers/campaignController.js";
const router = express.Router();

router.use(authMiddleware); 

router.get("/", listCampaigns);
router.post("/", createCampaign);
router.put("/:id", updateCampaign);    
router.delete("/:id", deleteCampaign); 

export default router;
