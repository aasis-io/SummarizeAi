const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for Google-authenticated users
    googleId: { type: String }, // To track Google users
  },
  { timestamps: true }
);

// Check if the model is already defined before creating it again
const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
