import { Player } from "./siteClasses";
export class Tournament {
	hostId: string;
	gameId: number;
	platformId: number;
	prize: number;
	startDate: Date;
	startTime: Date;
	maxPlayers: number;
	tournamentStyle: string;
	players: Player[];
	id: number;
	constructor(
		hostId: string,
		gameId: number | string,
		platformId: number | string,
		prize: number | string,
		startDate: Date | string,
		startTime: Date | string,
		maxPlayers: number | string,
		tournamentStyle: string,
		players?: Player[],
		id?: number
	) {
		this.id = id || 0;
		this.hostId = hostId;
		this.gameId = Number(gameId);
		this.platformId = Number(platformId);
		this.prize = Number(prize);
		this.startDate = new Date(startDate);
		this.startTime = new Date(startTime);
		this.maxPlayers = Number(maxPlayers);
		this.tournamentStyle = tournamentStyle;
		this.players = players ?? [];
	}
	updateId = (newId: number) => {
		this.id = newId;
	};
	updateTournament = (newTournament: Tournament) => {
		this.hostId = newTournament.hostId;
		this.gameId = newTournament.gameId;
		this.platformId = newTournament.platformId;
		this.prize = newTournament.prize;
		this.startDate = newTournament.startDate;
		this.startTime = newTournament.startTime;
		this.maxPlayers = newTournament.maxPlayers;
		this.tournamentStyle = newTournament.tournamentStyle;
		this.players = newTournament.players;
	};
	addPlayer = (player: Player) => {
		this.players.push(player);
	};
	removePlayer = (playerId: number) => {
		const index = this.players.findIndex(
			(player: Player) => player.id === playerId
		);
		if (index !== -1) {
			this.players.splice(index, 1);
		}
	};
}
