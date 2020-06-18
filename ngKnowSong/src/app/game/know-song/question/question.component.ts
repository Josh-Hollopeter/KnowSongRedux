import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SingleplayerQuestion } from 'src/app/model/singleplayer-question.model';
import { KnowSongComponent } from '../know-song.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements AfterViewInit {

  @Input() questionOptions: Array<string>;
  @Input() newAudio: string;

  @Output() optionPicked: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('audioElement', {static: false}) 
  public _audioRef: ElementRef;
  private audio: HTMLAudioElement;


  constructor() { }

  public ngAfterViewInit() {
    this.audio = this._audioRef.nativeElement;
    if (this.audio) {
      this.audio.src = this.newAudio;
      
    }
  }


  setUserResponse(answer: string){
    this.optionPicked.emit(answer);
  }

  public restart(): void{
    // this.audio.
  }

  public play(){
    this.audio.load();
    this.audio.play();
  }


}
