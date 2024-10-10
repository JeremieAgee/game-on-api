import { Request, Response } from "express";
// Create a tournament
import { supabaseDB } from "../database/supabaseDb";
const createTournament = async (req: Request, res: Response) => {
	const { name, game, platform, prize, startDate, startTime } = req.body;
	const currentTournament = {
		name,
		game,
		platform,
		prize,
		startDate,
		startTime,
	};
	const { data, error } = await supabaseDB.post(
		"/tournaments",
		currentTournament
	);
	if (error) {
		return res.status(400).json({ error: error.message });
	}

	res.status(201).json(data[0]);
};

// Get all tournaments
const getTournaments = async (req: Request, res: Response) => {
	const { data, error } = await supabaseDB.get("/tournaments");
	if (error) {
		return res.status(400).json({ error: error.message });
	}
	res.status(200).json(data);
};

// Update a tournament
const updateTournament = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, game, platform, prize, startDate, startTime } = req.body;
	const newTournament = { name, game, platform, prize, startDate, startTime };
	const { data, error } = await supabaseDB.put(
		"/tournaments",
		id,
		newTournament
	);

	if (error) {
		return res.status(400).json({ error: error.message });
	}

	res.status(200).json(data[0]);
};

// Delete a tournament
const deleteTournament = async (req: Request, res: Response) => {
	const { id } = req.params;

	const { data, error } = await supabaseDB.delete("/tournaments", id);
	if (error) {
		return res.status(400).json({ error: error.message });
	}
	res.status(200).json({ message: "Tournament deleted" });
};

export { createTournament, getTournaments, updateTournament, deleteTournament };
