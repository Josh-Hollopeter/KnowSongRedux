import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SingleplayerQuestion } from 'src/app/model/singleplayer-question.model';
import { KnowSongComponent } from '../know-song.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations: [
    trigger('clickMe', [
      state('normal', style({
        backgroundColor: 'transparent'
      })),
      state('listen', style({
        backgroundColor: 'yellow'
      })),
      transition('normal <=> listen', [
        animate('0.2s')
      ]),
    ]),
  ]
})
export class QuestionComponent implements AfterViewInit, OnChanges {

  @Input() questionOptions: Array<string>;
  @Input() newAudio: string;

  @Output() optionPicked: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('audioElement', {static: false}) public _audioRef: ElementRef;

  private audio: HTMLAudioElement;

  public listened:boolean;
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    this.listened = false;
  }

  public ngAfterViewInit() {
    this.audio = this._audioRef.nativeElement;
    if (this.audio) {
      this.audio.src = this.newAudio;
    }
  }


  setUserResponse(answer: string){
    if(this.listened){
      this.optionPicked.emit(answer);
    }
  }

  public restart(): void{
    // this.audio.
  }

  public play(){
    this.audio.load();
    this.audio.play();
    this.listened = true;
  }

}
