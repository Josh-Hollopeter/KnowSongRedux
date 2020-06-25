import { SingleplayerQuestion } from './singleplayer-question.model';

export class SingleplayerGame {

    description: string;
    questions: SingleplayerQuestion[];
    played;
    id: number;

    constructor(
        description?: string,
        questions?: SingleplayerQuestion[],
        played?,
        id?: number,
    ){

        this.description = description;
        this.questions = questions;
        this.played = played;
        this.id = id;
    }
}
