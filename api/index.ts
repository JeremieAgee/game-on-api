import { Site } from "./utils/site";
const express = require("express");
const cors = require("cors");
require("dotenv").config();
import authenticateUser from "./middleware/authMiddleware";
import genericError from "./middleware/genericError";
import notFound from "./middleware/notFound";
const thisSite = new Site("GameON");

const corsOptions = {
	origin: process.env.CLIENT_URL,
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
};

// Initialize Express app
const app = express();

(async () => {
	await thisSite.setSite(); // Wait for the site setup to complete
})();
	app.use(cors(corsOptions));
	app.use(express.json());

	// Routes without authentication
	app.get("/games", thisSite.getAllGames);
	app.get("/games/genre/:id", thisSite.getGamesByGenre);
	app.get("/games/platforms/:id", thisSite.getGamesByPlatform);
	app.get("/genre", thisSite.getAllGenre);
	app.get("/platforms", thisSite.getAllPlatforms);

	// Routes with authentication
	app.use(authenticateUser);
	app.get("/tournaments", thisSite.getAllTournaments);
	app.post("/tournaments", thisSite.addTournament);
	app.put("/tournaments/:id", thisSite.updateTournament);
	app.put("/tournaments/:id/player", thisSite.addPlayerToTournament);
	app.delete("/tournaments/:id/player", thisSite.removePlayerFromTournament);
	app.delete("/tournaments/:id", thisSite.deleteTournament);
	app.use(notFound);
	app.use(genericError);
module.exports = app;
