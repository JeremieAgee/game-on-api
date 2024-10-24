
// server.js
import { Site } from "./utils/site";
const express = require("express");
const cors = require("cors");
require("dotenv").config();
import authenticateUser from "./middleware/authMiddleware";
const thisSite = new Site("GameON");

const corsOptions = {
    origin: process.env.CLIENT_URL, // Replace with your client's origin
    // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};
// Initialize Express app
const app = express();
// Middleware
(async()=>{
    await thisSite.setSite();
app.use(cors(corsOptions));
app.use(express.json());

// Routesa
app.use(authenticateUser);

app.get("/games", thisSite.getAllGames);
app.get("/games/genre/:id", thisSite.getGamesByGenre);
app.get("/games/platorms/:id", thisSite.getGamesByPlatform);

app.get("/genre", thisSite.getAllGenre);
app.get("/platforms", thisSite.getAllPlatforms);

app.get("/tournaments", thisSite.getAllTournaments);
app.post("/tournaments", thisSite.addTournament);
app.put("/tournaments/:id", thisSite.updateTournament);
app.put("/tournaments/:id/player", thisSite.addPlayerToTournament);
app.delete("/tournaments/:id/player", thisSite.removePlayerFromTournament);
app.delete("/tournaments/:id", thisSite.deleteTournament);


module.exports = app;})();