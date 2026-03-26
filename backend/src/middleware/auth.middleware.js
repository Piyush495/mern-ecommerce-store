import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No access token provided" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
    }
  } catch (error) {
    console.log("Error in protectRoute middleware");
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const adminRoute = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized: Please login first",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied: Admin only",
    });
  }

  next();
};
