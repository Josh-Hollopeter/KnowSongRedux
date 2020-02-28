import { NgForm } from '@angular/forms';
import { DataService } from './../../injectable/data.service';
import { Artist } from './../../spotifyJSON/models/artist';
import { Quizmodel } from './../quiz/quizmodel';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {get} from 'lodash';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-board1',
  templateUrl: './board1.component.html',
  styleUrls: ['./board1.component.css']
})
export class Board1Component implements OnInit {

  constructor(private router: Router, private aroute: ActivatedRoute, private data: DataService) { }

  ngOnInit(): void {
    var artists = this.aroute.snapshot.paramMap.get("artists");
    // var questionInfo = this.data.storage;
    // console.log(questionInfo[0].name + "in game board");

    console.log(this.data.storage +  "in board component");


    this.questionBuilder();
  }
  myarray: String[] = [];
  i: number = 0;
  categories: String[] = ["play clip", "Name the Albums", "Release Year"];
  newstr: String
  //  singer = "Beyonce" + "'s";
  album = "Lemonade";
  year = 2014;
  roundOver: boolean;


  // quizQuestion = new Quizmodel(6, "Release Year", this.singerQuestion, [this.year, this.year +1, this.year +2, this.year -1], this.year )
  quizlist: Quizmodel[] = [





  ];

  /******************************************************* */
quizlength: number;
selectedcategory: Quizmodel[] = [];
question: string;
selectedvalue: String;
option: any[];
selectedCategories: any[];
selected;
playdatclip:boolean;
correct:boolean;



questionBuilder(){
  var questionInfo = this.data.storage;
  this.shuffle(questionInfo);
  console.log(questionInfo + "in game board");
  let j = 0;
  questionInfo.forEach(element => {
    // console.log(element.name);
    let singer = element.artist.name;
  let singerQuestion = "What year was " + singer + " album " + element.name + " released?";
  element.releaseYear
  var year = parseInt(element.releaseDate);
  console.log(element);
  var years =[year+1, year -1,year+2, year];
  years = this.shuffle(years);
  this.quizlist.push({ID :j,category:"Release Year",question: singerQuestion,anslistobj:years,answer:year});
  this.quizlist.push({ID :j,category:"play clip",question:element.tracks[j].previewUrl,anslistobj:years,answer:singer});
  // console.log("***********" + element.tracks[0].name);

 var test = get(element, 'track');
 console.log("***********" + JSON.stringify(element));

});
  j = 0;
  console.log(this.quizlist);
  // this.gettingCategory();
}
getQuestion(){
  document.getElementById("my-audio").setAttribute('src', this.question);

  return this.question;
}

  gettingCategory() {
    if(this.selectedvalue === "play clip" ){
      this.playdatclip = true;
    }else{
      this.playdatclip = false;
    }

    this.selectedCategories = this.quizlist.filter(d => (d.category == this.selectedvalue));
    console.log(this.selectedCategories[this.i].question)
    console.log(this.selectedCategories[this.i].question)
    this.i = 0;
    this.question = this.selectedCategories[this.i].question;
    this.option = this.selectedCategories[this.i].anslistobj;
    // this.i = 0;
    this.quizlength = this.selectedCategories.length - 1;
  }

  /******************************************************** */
  next() {


    if (this.i < this.selectedCategories.length - 1) {
      ++this.i;
      // console.log(this.i);
    }
    console.log(this.selectedCategories.length);
    if (this.i === this.selectedCategories.length) {
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

check() {

    console.log("..................."+this.selectedCategories[this.i].answer + " " + this.selected);
    this.correct = false;
    this.generatemark();
    this.answerkey.push(new AnswerKey(this.selectedCategories[this.i].answer, this.selected,this.question,this.correct));


  console.log(this.answerkey);
  // this.recursivecheck();

}
///////////////////////////////////

marks: number = 0;
generatemark() {
  // for (var i = this.i; i < this.answerkey.length; i++) {
  //   if (this.selected ==this.selectedCategories[this.i].answer) this.marks++;
  // }
  // alert("your score is "+JSON.stringify(this.marks));
  console.log(this.selected + "***#*#*#*#*#*#*#*#");
  console.log(this.selectedCategories[this.i] + "fdlkkjgkljljgflkgjfd");
  if(this.selected == this.selectedCategories[this.i].answer){
    this.marks ++;
    this.correct = true;
  }

}
submit(){
  // document.writeln("your score is " + this.marks);
  this.roundOver = true;

}
nameDatClip(){

}

  ///////////////////////////////////

// recursivecheck() {
//   var result1 = this.quizlist;
//   var result2 = this.answerkey;

//   var props = ['id', 'answer'];

//   var result = result1.filter(function (o1) {
//     // filter out (!) items in result2
//     return result2.some(function (o2) {
//       return o1.answer === o2.answer;
//       // assumes unique id
//     });

//   }).map(function (o) {

//     // use reduce to make objects with only the required properties
//     // and map to apply this to the filtered array as a whole
//     return props.reduce(function (newo, ans) {
//       newo[ans] = o[ans];
//       return newo;
//     }, {});
//   });
//   console.log("result:" + JSON.stringify(result));
// }
shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

}

export class AnswerKey {
  chosen: any;
  answer: any;
  question:any;
  correct:boolean;
  constructor(chosen: any, answer: any,question:any,correct:boolean) {
    this.chosen = chosen;
    this.answer = answer;
    this.question = question;
    this.correct = correct;
  }



}


