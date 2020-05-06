export class GameHistory {
    public marks:number;
    public numQuestions: number;
    public gameType: string;
    public datePlayed : string;
    public chosenText: string;
    public questionText: string;
    public answerText: string;
  
    constructor(marks?:number,numQuestions?:number, datePlayed?:string,chosenText?:string,questionText?:string,answerText?:string){
      this.marks = marks;
      this.numQuestions = numQuestions;
      this.datePlayed = datePlayed;
      this.chosenText = chosenText;
      this.questionText = questionText;
      this.answerText = answerText;
    }
}
