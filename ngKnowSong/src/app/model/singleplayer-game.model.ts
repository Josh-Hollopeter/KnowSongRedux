import { SingleplayerQuestion } from './singleplayer-question.model';

export class SingleplayerGame {

    description: string;
    questions: SingleplayerQuestion[];

    constructor(
        description?: string,
        questions?: SingleplayerQuestion[]
    ){

        this.description = description;
        this.questions = questions;
    }
}
