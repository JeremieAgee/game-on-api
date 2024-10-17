export class Game{
    name: string;
    genreId: number;
    id: number;
    constructor(name: string, genreId: number, id?: number){
        this.name = name;
        this.genreId = genreId;
        this.id = id?? 0;
    };
}