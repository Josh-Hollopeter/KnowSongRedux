import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { SingleplayerQuestion } from 'src/app/model/singleplayer-question.model';
import { KnowSongComponent } from '../know-song.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnChanges {

  @Input() questionOptions: Array<string>;
  @Input() newAudio: string;

  @Output() optionPicked: EventEmitter<string> = new EventEmitter<string>();

  audio: string;
  options: Array<string>;

  private showQuestion: boolean;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void{
    console.log(changes);
    this.loadDom();
  }

  ngOnInit(): void{}

  loadDom(){
    this.audio = this.newAudio;
    this.options = this.questionOptions;
  }

  setUserResponse(answer: string){
    this.optionPicked.emit(answer);
  }

  


}
