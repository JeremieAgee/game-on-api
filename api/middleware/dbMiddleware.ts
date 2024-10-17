import { supabaseDB } from "../database/supabaseDb";
import { Genre } from "../utils/genre";
import { Game } from "../utils/game";
import { Platform } from "../utils/platform";

// Create a game
const postGame = async (game: Game) => {
	const { data, error } = await supabaseDB.post(
		"/games",
		game
	);
	if (error) {
		return error;
	}
	return data.data;
};

// Get all games
const getGames = async () => {
	const { data, error } = await supabaseDB.get("/games");
	if (error) {
		return error
	}
	return data.data;
};

//Create a platform
const postPlatform = async (platform: Platform) => {
	const { data, error } = await supabaseDB.post(
		"/platforms",
		platform
	);
	if (error) {
		return error;
	}

	return data.data
};

// Get all platforms
const getPlatforms = async () => {
	const { data, error } = await supabaseDB.get("/platforms");
	if (error) {
		return error;
	}
	return data
};

//Create new genre
const postGenre = async (genre: Genre) => {
	const { data, error } = await supabaseDB.post(
		"/genre",
		genre
	);
	if (error) {
		return error;
	}
	return data.data;
};

// Get all genre for games
const getGenre = async () => {
	const { data, error } = await supabaseDB.get("/genre");
	if (error) {
		return error
	}
	return data.data;
};

export { postGame, getGames, postPlatform, getPlatforms, postGenre, getGenre };
