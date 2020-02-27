export class Quizmodel {
  ID: number;
  category: String;
  question: String;
  anslistobj: any;
  answer:any;

  constructor(
    ID?: number,
    category?: String,
    question?: String,
    anslistobj?: any,
    answer?: any
  ) {
    this.ID = ID;
    this.category = category;
    this.anslistobj = anslistobj;
    this.answer = answer;
  }
}
export class Answermodel {
  option: String[];
  constructor(option: String[]) {
    this.option = option;
  }
}
