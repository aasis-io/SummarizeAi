const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/summarize", require("./routes/summarizeRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
// plagiarism API route
app.use("/api/plagiarism", require("./routes/plagiarismRoutes"));


const adminAuthRoutes = require("./routes/adminAuthRoutes");
app.use("/api/admin-auth", adminAuthRoutes);

const adminUserRoutes = require("./routes/adminUserRoutes");
app.use("/api/admin", adminUserRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
