const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    console.error("Admin auth error:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminAuth;
