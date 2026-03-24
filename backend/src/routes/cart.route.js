import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addToCart,
  getCartProducts,
  removeAllFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

application.use(protectRoute);

router.get("/", getCartProducts);
router.post("/", addToCart);
router.delete("/", removeAllFromCart);
router.put("/:id", updateQuantity);

export default router;
