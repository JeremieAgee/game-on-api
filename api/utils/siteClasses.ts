export class Platform{
    id: number;
    name: string;
    games: number[];
    
    constructor(name: string, games: number[], id?: number){
        this.id = id ?? 0;
        this.name = name;
        this.games = games;   
    };
}
export class Genre{
    id: number;
    name: string;
    constructor(name: string, id?: number){
        this.id = id?? 0;
        this.name = name;
    };
}
export class Game{
    id: number;
    title: string;
    genreId: number;

    constructor(title: string, genreId: number, id?: number){
        this.id = id?? 0;
        this.title = title;
        this.genreId = genreId;
        
    };
}
export class Player {
	id: number;
	name: string;
	constructor(name: string, id: number) {
		this.id = id;
		this.name = name;
	}
}
