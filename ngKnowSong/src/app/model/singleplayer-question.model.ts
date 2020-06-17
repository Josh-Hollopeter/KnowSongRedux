export class SingleplayerQuestion {

    num: number;
    questionText: string;
    answer: string;
    option2: string;
    option3: string;
    option4: string;
    userResponse: string;

    constructor(
        num?: number,
        questionText?: string,
        answer?: string,
        option2?: string,
        option3?: string,
        option4?: string,
        userResponse?: string
    ){

        this.num = num;
        this.questionText = questionText;
        this.answer = answer;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.userResponse = userResponse;
    }
}
