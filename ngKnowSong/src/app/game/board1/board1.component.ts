import { NgForm } from '@angular/forms';
import { DataService } from './../../injectable/data.service';
import { Artist } from './../../spotifyJSON/models/artist';
import { Quizmodel } from './../quiz/quizmodel';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board1',
  templateUrl: './board1.component.html',
  styleUrls: ['./board1.component.css']
})
export class Board1Component implements OnInit {

  constructor(private router:Router,private aroute:ActivatedRoute,private data:DataService) { }

  ngOnInit(): void {
    var artists = this.aroute.snapshot.paramMap.get("artists");
    // var questionInfo = this.data.storage;
    // console.log(questionInfo[0].name + "in game board");
    this.questionBuilder();
  }
  myarray: String[] = [];
i: number = 0;
languages: String[] = ["play clip", "Name the Albums", "Release Year"];
 newstr: String
//  singer = "Beyonce" + "'s";
 album = "Lemonade";
 year = 2014;
 roundOver:boolean;


  // quizQuestion = new Quizmodel(6, "Release Year", this.singerQuestion, [this.year, this.year +1, this.year +2, this.year -1], this.year )
  quizlist: Quizmodel[] = [





  ];

  /******************************************************* */
quizlength: number;
selectedcategory: Quizmodel[] = [];
question: String;
selectedvalue: String;
option: any[];
selectedCategories: any[];
questionBuilder(){
  var questionInfo = this.data.storage;
  console.log(questionInfo + "in game board");
  let j = 0;
  questionInfo.forEach(element => {
    // console.log(element.name);
    let singer = element.name;
  let singerQuestion = "What year was " + singer + " album " + this.album + " released?";
      this.quizlist.push({ID :j,category:"Release Year",question: singerQuestion,anslistobj:[this.year,this.year-1,this.year+1,this.year+2],answer:this.year});
  });
  j = 0;
  console.log(this.quizlist);
  // this.gettingCategory();
}


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
      // console.log(this.i);
    }
      console.log(this.selectedCategories.length);
    if(this.i === this.selectedCategories.length){
      this.roundOver = true;
      // console.log(this.roundOver);
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

  check(form:NgForm) {

    // if (e.target.checked) {
      console.log("..................."+form.value.name + " " + this.selectedCategories[this.i].answer);
      this.answerkey.push(new AnswerKey(form.value.name,this.selectedCategories[this.i].answer));
    // }
    // else {

    //   this.answerkey.splice(0, 1);
    // // }

    console.log(this.answerkey);
    this.sumAnswer();
    // this.generatemark()
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

    if(this.lengthCheck === this.selectedCategories.length-1){
      this.generatemark();
      this.roundOver = true;
      // document.writeln("your score is " + this.marks);
      }
      // console.log(this.roundOver);
      // console.log("*****" + this.i);
      // console.log("****" + this.lengthCheck);
  }
  returnHome(){
    console.log("click");
  }

  ///////////////////////////////////

  sumAnswer() {
    var result1 = this.quizlist;
    var result2 = this.answerkey;

    var props = ['id', 'answer'];

    var result = result1.filter(function (o1) {
      // filter out (!) items in result2
      return result2.some(function (o2) {
        return o1.answer === o2.answer;
        // assumes unique id
      });

    }).map(function (o) {

      // use reduce to make objects with only the required properties
      // and map to apply this to the filtered array as a whole
      return props.reduce(function (newo, ans) {
        newo[ans] = o[ans];
        return newo;
      }, {});
    });
    console.log("result:" + JSON.stringify(result));
  }


 }

export class AnswerKey {
  chosen: any;
  answer: any;
  constructor(chosen: any, answer: any) {
    this.chosen = chosen;
    this.answer = answer;
  }



}


