
import { Tournament } from "../utils/tournament";
// Create a tournament
import { supabaseDB } from "../database/supabaseDb";
const createTournament = async (currentTournament: Tournament) => {
	const { data, error } = await supabaseDB.post(
		"/tournaments",
		currentTournament
	);
	if(error){
		return error
	}
	currentTournament.updateId(data.id)
	return currentTournament;
};

// Get all tournaments
const getTournaments = async () => {
	const { data, error } = await supabaseDB.get("/tournaments");
	if (error) {
		return error;
	}
	console.log(data)
	return data;
};

// Update a tournament
const updateTournament = async (id: number, tournament: Tournament) => {
	const { data, error } = await supabaseDB.put(
	  "/tournaments",
	  id,
	  tournament
	);
  
	if (error) {
	  // Handle error, pass it back for the higher-level function to deal with it
	  throw new Error(error.message);
	}
	return data.data; // Return the updated tournament data
  };
  
// Delete a tournament
const deleteTournament = async (id: number) => {
	const { data, error } = await supabaseDB.delete("/tournaments", id);
	if (error) {
		return error
	}
	return data.data
};

export { createTournament, getTournaments, updateTournament, deleteTournament };
