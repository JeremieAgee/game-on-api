
// server.js
import { Site } from "./utils/siteClass";
const express = require("express");
const cors = require("cors");
require("dotenv").config();
import authenticateUser from "./middleware/authMiddleware";
const thisSite = new Site("GameON");
// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(thisSite.setSite);
// Routes
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


module.exports = app;