const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // ✅ Add this import
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Start OAuth flow (for web OAuth flow)
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// OAuth callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.redirect(
      `${process.env.CLIENT_URL}/google-auth-success?token=${token}`
    );
  }
);

// ✅ Google One Tap / OAuth Button (Frontend sends decoded token info here)
router.post("/google-login", async (req, res) => {
  const { name, email, googleId } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: googleId, // Consider replacing with secure dummy
        googleId: googleId, // Store real Google ID
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        googleId: user.googleId,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("Error saving Google user:", err);
    res.status(500).json({ message: "Google login failed" });
  }
});

// Manual login & register
router.post("/register", register);
router.post("/login", login);

module.exports = router;
