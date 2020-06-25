import { SingleplayerQuestion } from './singleplayer-question.model';

export class SingleplayerGame {

    description: string;
    questions: SingleplayerQuestion[];
    played: Date;
    id: number;


    constructor(
        description?: string,
        questions?: SingleplayerQuestion[],
        played?: Date,
        id?: number
    ){

        this.description = description;
        this.questions = questions;
        this.played = played;
        this.id = id;
    }
}
