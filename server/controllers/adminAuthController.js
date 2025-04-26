const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

// Admin Register (optional)
const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new Admin({ name, email, password });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
};

// Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};


module.exports = {
  loginAdmin,
  registerAdmin,
  getAdminProfile,
};
