import home from "./routes/home";
// server.js
import { Site } from "./utils/siteClass";
const express = require("express");
const cors = require("cors");
require("dotenv").config();
import {authenticateUser} from "./middleware/authMiddleware" 
const thisSite = new Site("GameON")
const PORT = process.env.PORT;
// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(authenticateUser);


app.get("/", home);


app.listen(PORT, async () => {
	await thisSite.setSite();
	console.log(`Server running on port ${PORT}`);
});
