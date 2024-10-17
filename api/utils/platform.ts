export class Platform{
    name: string;
    games: number[];
    id: number;
    constructor(name: string, games: number[], id?: number){
        this.name = name;
        this.games = games;
        this.id = id ?? 0;
    };
}