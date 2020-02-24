import { Quizmodel } from './../quiz/quizmodel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board1',
  templateUrl: './board1.component.html',
  styleUrls: ['./board1.component.css']
})
export class Board1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }
  myarray: String[] = [];
i: number = 0;
languages: String[] = ["java", "cprogram", "C++", "Spring", "Html", "Asp.net","Release Year"];
 newstr: String
 actress = "Beyonce" + "'s";
 album = "Lemonade";
 year = 2014;

  quizQuestion = new Quizmodel(6, "Release Year", "What year was" + this.actress + "album" + this.album + "released?", [this.year, this.year +1, this.year +2, this.year -1], this.year )
  quizlist: Quizmodel[] = [
    {
      ID: 1, language: "java", question: "Inventor of c++?", anslistobj: ["Pavan.c", "James Gosling", "Richie Richie", "Amos.Emmanual"], answer: "Richie Richie"
    },
    {
      ID: 2, language: "java", question: "Inventor of java?", anslistobj: ["Nayan.c", "Ärmesh", "Denish Richie", "Kiran.DY"], answer: "Denish Richie"
    },
    {
      ID: 3, language: "java", question: "how is java?", anslistobj: ["Easy", "Difficult", "moderate", "nonoe"], answer: "Easy"
    },
    {
      ID: 4, language: "cprogram", question: "Inventor of cprogram?", anslistobj: ["a", "b", "c", "d"], answer: "a"
    } ,
    {
      ID: 5, language: "cprogram", question: "Inventor of cprogram?", anslistobj: ["a", "b", "c", "d"], answer: "b"
    },
    { ID: 7, language: "Release Year", question: "What year was " + this.actress + " album " + this.album + " released?",anslistobj:this.quizQuestion.anslistobj, answer: 2014
  },
    // },
    {ID:this.quizQuestion.ID, language:this.quizQuestion.language, question:this.quizQuestion.question,anslistobj:this.quizQuestion.anslistobj,answer:this.quizQuestion.answer }
    // this.quizQuestion

  ];

  /******************************************************* */
quizlength: number;
selectedlanguage: Quizmodel[] = [];
question: String;
selectedvalue: String;
option: any[];
selectedlanques: any[];
gettinglanguage() {
this.selectedlanques =  this.quizlist.filter(d => (d.language == this.selectedvalue));
this.i = 0;
this.question = this.selectedlanques[this.i].question;
this.option = this.selectedlanques[this.i].anslistobj;
// this.i = 0;
this.quizlength = this.selectedlanques.length-1;
  }

  /******************************************************** */
  next() {
    ++this.i;
    this.question = this.selectedlanques[this.i].question;
    this.option = this.selectedlanques[this.i].anslistobj;
  }
  previous() {
    --this.i;
    this.question = this.selectedlanques[this.i].question;
    this.option = this.selectedlanques[this.i].anslistobj;
  }

/********************************************************* */

  answerkey: AnswerKey[] = [];

  check(e, str: String) {
    if (e.target.checked) {
      console.log("..................."+str + " " + this.selectedlanques[this.i].answer);
      this.answerkey.push(new AnswerKey(str,this.selectedlanques[this.i].answer));
    }
    else {

      this.answerkey.splice(0, 1);
    }
    console.log(this.answerkey);
    this.generatemark();
  }
  ///////////////////////////////////

  marks: number = 0;
  lengthCheck = 0;
  generatemark() {
    for (var i = 0; i < this.answerkey.length; i++) {
      console.log("chosen *****" + this.answerkey[i].chosen + "*******");
      console.log("answer *****" + this.selectedlanques[this.i].answer + "*******");
      if (this.answerkey[i].chosen ==  this.selectedlanques[this.i].answer) {
        this.marks++;
        this.lengthCheck++;

      }
    }
    console.log(this.lengthCheck);
    // alert("your score is "+JSON.stringify(this.marks));
    if(this.lengthCheck === this.selectedlanques.length)
    // document.writeln("your score is " + this.marks);
    var body = document.getElementsByTagName("body")[0];
    var button = document.createElement("button");
    button.addEventListener("click",this.returnHome);
    body.appendChild(button);


  }
  returnHome(){
    console.log("click");
  }

  ///////////////////////////////////

//   sumAnswer() {
//     var result1 = this.quizlist;
//     var result2 = this.answerkey;

//     var props = ['id', 'answer'];

//     var result = result1.filter(function (o1) {
//       // filter out (!) items in result2
//       return result2.some(function (o2) {
//         return o1.answer === o2.answer;
//         // assumes unique id
//       });

//     }).map(function (o) {

//       // use reduce to make objects with only the required properties
//       // and map to apply this to the filtered array as a whole
//       return props.reduce(function (newo, ans) {
//         newo[ans] = o[ans];
//         return newo;
//       }, {});
//     });
//     console.log("result:" + JSON.stringify(result));
//   }


 }

export class AnswerKey {
  chosen: any;
  answer: any;
  constructor(chosen: any, answer: any) {
    this.chosen = chosen;
    this.answer = answer;
  }



}


