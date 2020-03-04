export class GameHistory {

  public marks:number;
  public numQuestions: number;
  public gameType: string;
  public datePlayed : string;

  constructor(marks?:number,numQuestions?:number, datePlayed?:string){
    this.marks = marks;
    this.numQuestions = numQuestions;
    this.datePlayed = datePlayed;

  }


}
