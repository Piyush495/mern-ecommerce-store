import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getCoupon);
router.post("/validate", validateCoupon);

export default router;
