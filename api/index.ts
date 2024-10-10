import home from "./routes/home";

// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const tournamentRoutes = require('./routes/tournaments');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tournaments', tournamentRoutes);

// Root endpoint
app.get('/', home);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
