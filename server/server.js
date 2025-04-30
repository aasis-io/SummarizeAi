const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");

dotenv.config(); // Load .env first
connectDB();

const app = express();

// CORS setup
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow frontend (e.g., http://localhost:3000 for local)
    credentials: true, // Allow credentials (cookies)
  })
);

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow frontend (e.g., http://localhost:3000 for local)
    credentials: true, // Allow credentials (cookies)
  })
);

// Session middleware - must be before passport.session()
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Store this in .env
    resave: false,
    saveUninitialized: false,
  })
);

// Passport setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // From .env file
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // From .env file
      callbackURL: `${process.env.API_URL}/api/auth/google/callback`, // API URL from .env
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Use profile info to find or create a user in your DB
        // For simplicity, we'll return the profile here.
        return done(null, profile);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Middleware to initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/summarize", require("./routes/summarizeRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/plagiarism", require("./routes/plagiarismRoutes"));
app.use("/api/admin-auth", require("./routes/adminAuthRoutes"));
app.use("/api/admin", require("./routes/adminUserRoutes"));

// Google authentication route
app.get(
  "/api/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login", // Redirect to login if authentication fails
  }),
  (req, res) => {
    // After successful login, generate JWT token and send it to the client
    const token = generateToken(req.user); // Generate JWT token for the logged-in user
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`); // Redirect to frontend with token in URL
  }
);

// JWT token generation function
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, name: user.displayName, email: user.emails[0].value },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Set the token expiration time
    }
  );
}

// Set the port for the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
