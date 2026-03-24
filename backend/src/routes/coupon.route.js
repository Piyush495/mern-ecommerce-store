import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller";

const router = express.Router();

router.use(protectRoute);

router.get("/", getCoupon);
router.post("/validate", validateCoupon);

export default router;
