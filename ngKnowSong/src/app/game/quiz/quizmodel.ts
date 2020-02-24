export class Quizmodel {
  ID: number;
  language: String;
  question: String;
  anslistobj;
  answer;

  constructor(
    ID: number,
    language: String,
    question: String,
    anslistobj,
    answer
  ) {
    this.ID = ID;
    this.language = language;
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
