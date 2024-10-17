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