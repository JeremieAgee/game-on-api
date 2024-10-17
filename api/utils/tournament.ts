
export class Tournament {
	hostId: number;
	gameId: number;
	genreId: number;
	platformId: number;
	prize: number;
	startDate: Date;
	startTime: Date;
	maxPlayers: number;
	tournamentStyle: string;
	playerIds: number[];
	id: number;
	constructor(
		hostId: number,
		gameId: number,
		genreId: number,
		platformId: number,
		prize: number,
		startDate: Date | string,
		startTime: Date | string,
		maxPlayers: number,
		tournamentStyle: string,
		playerIds: number[],
        id?: number,
	) {
        this.id = id ?? 0;
		this.hostId = hostId;
		this.gameId = gameId;
        this.genreId = genreId;
        this.platformId = platformId;
        this.prize = prize;
        this.startDate = new Date(startDate);
        this.startTime = new Date(startTime);
        this.maxPlayers = maxPlayers;
        this.tournamentStyle = tournamentStyle;
        this.playerIds = playerIds;
	}
    updateId = (newId: number)=>{
        this.id = newId;
    }
    updateTournament = (newTournament: Tournament)=>{
		this.hostId = newTournament.hostId;
		this.gameId = newTournament.gameId;
        this.genreId = newTournament.genreId;
        this.platformId = newTournament.platformId;
        this.prize = newTournament.prize;
        this.startDate = newTournament.startDate;
        this.startTime = newTournament.startTime;
        this.maxPlayers = newTournament.maxPlayers;
        this.tournamentStyle = newTournament.tournamentStyle;
        this.playerIds = newTournament.playerIds;
    }
    addPlayer = (playerId: number)=>{
        this.playerIds.push(playerId);
    }
}
