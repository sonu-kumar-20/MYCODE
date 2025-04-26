const express = require("express");
const connectDB = require("./init/db");
const path = require("path");
require("dotenv").config(); // Load .env variables

const app = express();

// Connect to the database
connectDB();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Main route
app.get("/", (req, res) => {
  res.render("main");
});

// Import routes
const problemRoutes = require("./routes/problemRoutes");
const runCodeRoutes = require("./routes/runCodeRoutes");
const updateStatusRoutes = require("./routes/updateStatusRoutes");
const updateVviRoutes = require("./routes/updateVviRoutes");

// Use routes
app.use("/allproblem", problemRoutes);
app.use("/problems", problemRoutes);
app.use("/run", runCodeRoutes);
app.use("/updateStatus", updateStatusRoutes); // New route for status updates
app.use("/updateVVI", updateVviRoutes); // New route for VVI updates

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
