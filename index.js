// Import necessary modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

// Initialize express app
const app = express();

// Define PORT
const PORT = process.env.PORT || 4000;

// Middleware (to parse JSON requests)
app.use(express.json());
app.use(cors());
app.use(cookieParser());




// Import routes
const authRoutes = require("./routes/User"); // Added auth routes

// Mount routes
app.use("/api/v1/auth", authRoutes); // Mounted auth routes

// Connect to the database
const connectWithDb = require("./config/database");
connectWithDb();

// Default route
app.get("/", (req, res) => {
    res.send(`<h1>Hi, this is Vinay</h1>`);
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again later.",
        error: err.message,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`App started at PORT no ${PORT}`);
});
