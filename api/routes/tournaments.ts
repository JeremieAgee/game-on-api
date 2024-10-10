// routes/tournamentRoutes.js
const express = require("express");
import {
	createTournament,
	deleteTournament,
	getTournaments,
	updateTournament,
} from "../middleware/tournamentsMiddleware";
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

// Create a tournament (protected)
router.post("/", authenticateUser, createTournament);

// Get all tournaments (public)
router.get("/", getTournaments);

// Update a tournament (protected)
router.put("/:id", authenticateUser, updateTournament);

// Delete a tournament (protected)
router.delete("/:id", authenticateUser, deleteTournament);

module.exports = router;
