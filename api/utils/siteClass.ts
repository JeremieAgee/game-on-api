import { Tournament } from "./tournament";
import { Game } from "./game";
import { Platform } from "./platform";
import {
	createTournament,
	deleteTournament,
	getTournaments,
	updateTournament,
} from "../middleware/tournamentsMiddleware";
import { Request, Response } from "express";
import { Genre } from "./genre";
import { getGames, getPlatforms, getGenre } from "../middleware/dbMiddleware";
import { platform } from "os";
export class Site {
	name: string;
	platforms: Platform[];
	genre: Genre[];
	games: Game[];
	tournaments: Tournament[];
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
	}
	setSite = async () => {
		const games = await getGames();
		const platforms = await getPlatforms();
		const genre = await getGenre();
		const tournaments = await getTournaments();
		if(tournaments){
			this.tournaments = tournaments.map((item: Tournament) => {
			return new Tournament(
				item.hostId,
				item.gameId,
				item.genreId,
				item.platformId,
				item.prize,
				item.startDate,
				item.startTime,
				item.maxPlayers,
				item.tournamentStyle,
				item.playerNames,
				item.id
			);
		});}
		
		this.games = games.map((obj: Game) => {
			return new Game(obj.title, obj.genreId, obj.id);
		});
		this.platforms = platforms.map((item: Platform) => {
			return new Platform(item.name, item.games, item.id);
		});
		this.genre = genre.map((item: Genre) => {
			return new Genre(item.name, item.id);
		});
		console.log(this.games);
		console.log(this.platforms);
		console.log(this.genre);
	};
	addTournament = async (req: Request, res: Response) => {
		const {
			hostId,
			gameId,
			genereId,
			platformId,
			prize,
			startDate,
			startTime,
			maxPlayers,
			tournamentStyle,
			playerIds,
		} = req.body;
		const newTournament = new Tournament(
			hostId,
			gameId,
			genereId,
			platformId,
			prize,
			startDate,
			startTime,
			maxPlayers,
			tournamentStyle,
			playerIds
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
			genereId,
			platformId,
			prize,
			startDate,
			startTime,
			maxPlayers,
			tournamentStyle,
			playerIds,
		} = req.body;
		const newTournament = new Tournament(
			hostId,
			gameId,
			genereId,
			platformId,
			prize,
			startDate,
			startTime,
			maxPlayers,
			tournamentStyle,
			playerIds
		);
		thisTournament.updateTournament(newTournament);
		updateTournament(Number(id), newTournament);
		res.status(200).json({ message: `Tournament updated` });
	};
	deleteTournament = async (req: Request, res: Response) => {
		const { id } = req.params;
		const found = this.findTournament(Number(id));
		if (found) {
			const index = this.tournaments.findIndex((item: Tournament) => {
				return item.id === found.id;
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
		if (foundGames) {
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
	findPlatformById = (platformId: number)=>{
		const platform = this.platforms.find((item: Platform)=>{return item.id===platformId});
		if(platform){
			return platform;
		} else {
			throw new Error(`No platform found`)
		}
	}
	getAllGames = (req: Request, res: Response) => {
        res.status(200).json(this.games);
    };
    getAllTournaments = (req: Request, res: Response) => {
        res.status(200).json(this.tournaments)
    }
    getAllGenre = (req: Request, res: Response) => {
        res.status(200).json(this.genre)  
    }
	getAllPlatforms = (req: Request, res: Response)=>{
		res.status(200).json(this.platforms);
	}
	getGamesByGenre = (req:Request, res:Response)=>{
		const games = this.findGamesByGenre(Number(req.params.id));
		res.status(200).json(games);
	}
	getGamesByPlatform = (req:Request, res:Response)=>{
		const platform = this.findPlatformById(Number(req.params.id));
		let games: Game[] = [];
		platform.games.forEach((item: number)=>{
			games.push(this.findGameById(item))
		})
		res.status(200).json(games)
	}
}
