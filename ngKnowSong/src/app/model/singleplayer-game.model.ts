import { SingleplayerQuestion } from './singleplayer-question.model';

export class SingleplayerGame {

    description: string;
    questions: SingleplayerQuestion[];
    played: Date;


    constructor(
        description?: string,
        questions?: SingleplayerQuestion[],
        played?: Date,
        
    ){

        this.description = description;
        this.questions = questions;
    }
}
