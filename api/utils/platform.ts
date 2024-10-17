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