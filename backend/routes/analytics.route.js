import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getAnalyticsData } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async(req, res) => {
    try {
        const analyticsData = await getAnalyticsData();
    } catch (error) {
        
    }
})

export default router;