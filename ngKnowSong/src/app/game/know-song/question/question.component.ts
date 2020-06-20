import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SingleplayerQuestion } from 'src/app/model/singleplayer-question.model';
import { KnowSongComponent } from '../know-song.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { clear } from 'console';

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

  private timeout;
  private intervalIn;
  
  play(){
    this.listened = true;
    if(this.timeout !=null){
      clearTimeout(this.timeout);
    }
    if(this.intervalIn != null){
      clearInterval(this.intervalIn);
    }
    this.audio.load();
    this.audio.volume = 0;
    this.audio.play();
    
    // fade in
    this.intervalIn = setInterval( () =>{
      if(this.audio.volume < .9){
        this.audio.volume += 0.1;
      }
      else{
        clearInterval(this.intervalIn);
      }
    }, 50);
    
    // fade out after 10 seconds
    this.timeout = setTimeout( () =>{
      let intervalOut = setInterval( () =>{
        if(this.audio.volume > 0.1){
          this.audio.volume -= 0.1;
        }
        else{
          this.audio.pause();
          clearInterval(intervalOut);
        }
      }, 100); 
    } , 10000);
  }


}
