import { SingleplayerQuestion } from './singleplayer-question.model';

export class SingleplayerGame {

    artist: string;
    gameType: string;
    questions: SingleplayerQuestion[];
    played;
    id: number;

    constructor(
        artist?: string,
        gameType?: string,
        questions?: SingleplayerQuestion[],
        played?,
        id?: number,
    ){

        this.artist = artist;
        this.gameType = gameType;
        this.questions = questions;
        this.played = played;
        this.id = id;
    }
}
