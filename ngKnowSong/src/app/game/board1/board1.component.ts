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
languages: String[] = ["play clip", "Name the Albums", "Release Year"];
 newstr: String
 singer = "Beyonce" + "'s";
 album = "Lemonade";
 year = 2014;
 roundOver:boolean;
 singerQuestion = "What year was " + this.singer + " album " + this.album + " released?";

  quizQuestion = new Quizmodel(6, "Release Year", this.singerQuestion, [this.year, this.year +1, this.year +2, this.year -1], this.year )
  quizlist: Quizmodel[] = [
    {
      ID: 1, category: "play clip", question: "Inventor of c++?", anslistobj: ["Pavan.c", "James Gosling", "Richie Richie", "Amos.Emmanual"], answer: "Richie Richie"
    },
    {
      ID: 2, category: "play clip", question: "Inventor of java?", anslistobj: ["Nayan.c", "Ärmesh", "Denish Richie", "Kiran.DY"], answer: "Denish Richie"
    },
    {
      ID: 3, category: "Release Year", question: "how is java?", anslistobj: ["Easy", "Difficult", "moderate", "nonoe"], answer: "Easy"
    },
    {
      ID: 4, category: "cprogram", question: "Inventor of cprogram?", anslistobj: ["a", "b", "c", "d"], answer: "a"
    } ,
    {
      ID: 5, category: "cprogram", question: "Inventor of cprogram?", anslistobj: ["a", "b", "c", "d"], answer: "b"
    },
    { ID: 7, category: "Release Year", question: "What year was " + this.singer + " album " + this.album + " released?",anslistobj:this.quizQuestion.anslistobj, answer: 2014
  },
    // },
    // {ID:this.quizQuestion.ID, category:this.quizQuestion.category, question:this.quizQuestion.question,anslistobj:this.quizQuestion.anslistobj,answer:this.quizQuestion.answer }
    this.quizQuestion,
    { ID: 8, category: "Release Year", question: "What year was " + this.singer + " album " + this.album + " released?",anslistobj:[this.year,this.year+1,this.year+2,this.year-1], answer: 2014
    },
    { ID: 9, category: "Release Year", question: "What year was " + this.singer + " album " + this.album + " released?",anslistobj:this.quizQuestion.anslistobj, answer: 2014
    },{ ID: 10, category: "Release Year", question: "What year was " + this.singer + " album " + this.album + " released?",anslistobj:this.quizQuestion.anslistobj, answer: 2014
  },

  ];

  /******************************************************* */
quizlength: number;
selectedcategory: Quizmodel[] = [];
question: String;
selectedvalue: String;
option: any[];
selectedCategories: any[];
gettingCategory() {

  this.selectedCategories =  this.quizlist.filter(d => (d.category == this.selectedvalue));
  console.log(this.selectedCategories[this.i].question)
console.log(this.selectedCategories[this.i].question)
this.i = 0;
this.question = this.selectedCategories[this.i].question;
this.option = this.selectedCategories[this.i].anslistobj;
// this.i = 0;
this.quizlength = this.selectedCategories.length-1;
  }

  /******************************************************** */
  next() {


    if(this.i < this.selectedCategories.length-1){
      ++this.i;
    }
    if(this.i === this.selectedCategories.length){
      this.roundOver = true;
      // document.writeln("your score is " + this.marks);
      }
    console.log(this.selectedCategories[this.i].answer)
    this.question = this.selectedCategories[this.i].question;
    this.option = this.selectedCategories[this.i].anslistobj;
  }
  previous() {
    --this.i;
    this.question = this.selectedCategories[this.i].question;
    this.option = this.selectedCategories[this.i].anslistobj;
  }

/********************************************************* */

  answerkey: AnswerKey[] = [];

  check(e, str: String) {

    if (e.target.checked) {
      console.log("..................."+str + " " + this.selectedCategories[this.i].answer);
      this.answerkey.push(new AnswerKey(str,this.selectedCategories[this.i].answer));
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
    for (var i = this.i; i < this.answerkey.length; i++) {
      console.log("chosen *****" + this.answerkey[i].chosen + "*******");
      console.log("answer *****" + this.selectedCategories[this.i].answer + "*******");
      if (this.answerkey[i].chosen ===  this.selectedCategories[this.i].answer) {
        this.marks++;
        this.lengthCheck++;

      }


    }
    console.log(this.lengthCheck);
    // alert("your score is "+JSON.stringify(this.marks));

    this.next();
    if(this.lengthCheck === this.selectedCategories.length){
      this.roundOver = true;
      // document.writeln("your score is " + this.marks);
      }
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


