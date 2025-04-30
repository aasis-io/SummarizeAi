// backend/middleware/adminAuth.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();

const adminAuth = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Remove 'Bearer ' prefix if present
    const cleanToken = token.replace("Bearer ", "");

    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    req.admin = admin; // attach admin info to request
    next();
  } catch (error) {
    console.error("Admin auth error:", error.message);
    res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

module.exports = adminAuth;
