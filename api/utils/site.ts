import { Tournament } from "./tournament";
import { Platform, Genre, Game, Player } from "./siteClasses";
import {
	createTournament,
	deleteTournament,
	getTournaments,
	updateTournament,
} from "../middleware/tournamentsMiddleware";
import { NextFunction, Request, Response } from "express";

import { getGames, getPlatforms, getGenre } from "../middleware/dbMiddleware";


export class Site {
	name: string;
	platforms: Platform[];
	genre: Genre[];
	games: Game[];
	tournaments: Tournament[];
	set: number;
	constructor(
		name: string,
		platforms?: Platform[],
		genre?: Genre[],
		games?: Game[],
		tournaments?: Tournament[]
	) {
		this.name = name;
		this.platforms = platforms ?? [];
		this.genre = genre ?? [];
		this.games = games ?? [];
		this.tournaments = tournaments ?? [];
		this.set = 0;
	}
	setSite = async () => {
		if(this.set>0){
			return
		}
		this.set++;
		console.log(this.set);
		const games = await getGames();
		const platforms = await getPlatforms();
		const genre = await getGenre();
		const tournaments = await getTournaments();
		if (tournaments) {
			this.tournaments = tournaments.map((item: Tournament) => {
				return new Tournament(
					item.hostId,
					item.gameId,
					item.platformId,
					item.prize,
					item.startDate,
					item.startTime,
					item.maxPlayers,
					item.tournamentStyle,
					item.players,
					item.id
				);
			});
		}

		this.games = games.map((obj: Game) => {
			return new Game(obj.title, obj.genreId, obj.id);
		});
		this.platforms = platforms.map((item: Platform) => {
			return new Platform(item.name, item.games, item.id);
		});
		this.genre = genre.map((item: Genre) => {
			return new Genre(item.name, item.id);
		});
		
	};
	addTournament = async (req: Request, res: Response) => {
		const {
			hostId,
			gameId,
			platformId,
			prize,
			startDate,
			startTime,
			maxPlayers,
			tournamentStyle,
		} = req.body;
		const newTournament = new Tournament(
			hostId,
			gameId,
			platformId,
			prize,
			startDate,
			startTime,
			maxPlayers,
			tournamentStyle
		);
		const updatedTournament = await createTournament(newTournament);
		this.tournaments.push(updatedTournament);
		res.status(200).json({ message: `Tournament Added` });
	};
	updateTournament = async (req: Request, res: Response) => {
		const { id } = req.params;
		const thisTournament = this.findTournament(Number(id));
		const {
			hostId,
			gameId,
			platformId,
			prize,
			startDate,
			startTime,
			maxPlayers,
			tournamentStyle,
			players,
		} = req.body;
		const newTournament = new Tournament(
			hostId,
			gameId,
			platformId,
			prize,
			startDate,
			startTime,
			maxPlayers,
			tournamentStyle,
			players
		);
		thisTournament.updateTournament(newTournament);
		updateTournament(Number(id), newTournament);
		res.status(200).json({ message: `Tournament updated` });
	};
	deleteTournament = async (req: Request, res: Response) => {
		const { id } = req.params;
		const foundItem = this.findTournament(Number(id));
		if (foundItem) {
			const index = this.tournaments.findIndex((item: Tournament) => {
				return item === foundItem;
			});
			this.tournaments.slice(index, 1);
			deleteTournament(Number(id));
			res.status(200).json({ message: `Tournament has been deleted` });
		}
	};
	findTournament = (id: number) => {
		const foundTournament = this.tournaments.find((tournament: Tournament) => {
			return tournament.id === id;
		});
		if (foundTournament) {
			return foundTournament;
		} else {
			throw new Error(`No tournament with ${id} as the id?`);
		}
	};
	findGameById = (id: number) => {
		const foundGame = this.games.find((game: Game) => {
			return game.id === id;
		});
		if (foundGame) {
			return foundGame;
		} else {
			throw new Error(`No game with ${id} as the id?`);
		}
	};
	findGamesByGenre = (genreId: number) => {
		const genre = this.findGenreById(genreId);
		const foundGames = this.games.filter((game: Game) => {
			return game.genreId === genreId;
		});
		if (foundGames && genre) {
			return foundGames;
		} else {
			throw new Error(`no found games with that genre`);
		}
	};
	findGenreById = (genreId: number) => {
		const foundGenre = this.genre.find((genre: Genre) => {
			return genre.id === genreId;
		});
		if (foundGenre) {
			return foundGenre;
		} else {
			throw new Error(`No genre found`);
		}
	};
	findPlatformById = (platformId: number) => {
		const platform = this.platforms.find((item: Platform) => {
			return item.id === platformId;
		});
		if (platform) {
			return platform;
		} else {
			throw new Error(`No platform found`);
		}
	};
	getAllGames = (req: Request, res: Response) => {
		res.status(200).json(this.games);
	};
	getAllTournaments = (req: Request, res: Response) => {
		res.status(200).json(this.tournaments);
	};
	getAllGenre = (req: Request, res: Response) => {
		res.status(200).json(this.genre);
	};
	getAllPlatforms = (req: Request, res: Response) => {
		res.status(200).json(this.platforms);
	};
	getGamesByGenre = (req: Request, res: Response) => {
		const games = this.findGamesByGenre(Number(req.params.id));
		res.status(200).json(games);
	};
	getGamesByPlatform = (req: Request, res: Response) => {
		const platform = this.findPlatformById(Number(req.params.id));
		let games: Game[] = [];
		platform.games.forEach((item: number) => {
			games.push(this.findGameById(item));
		});
		res.status(200).json(games);
	};
	addPlayerToTournament = (req: Request, res: Response) => {
		const tournament = this.findTournament(Number(req.params.id));
		const { name, id } = req.body;
		if (tournament) {
			tournament.addPlayer(new Player(name, id));
			updateTournament(tournament.id, tournament);
		}
	};
	removePlayerFromTournament = (req: Request, res: Response)=>{
		const tournament = this.findTournament(Number(req.params.id));
		const { id } = req.body;
		if (tournament) {
			tournament.removePlayer(id);
			updateTournament(tournament.id, tournament);
		}
	}
}
