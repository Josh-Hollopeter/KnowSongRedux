import { AudioResolverService } from './../resolver/audio-resolver.service';
import { Component, OnInit, Directive } from '@angular/core';
import { MusicDataService } from '../data/music-data.service';
import { Artist } from 'src/app/model/artist';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { SingleplayerQuestion } from 'src/app/model/singleplayer-question.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';

@Component({
  selector: 'app-know-song',
  templateUrl: './know-song.component.html',
  styleUrls: ['./know-song.component.css']
})
export class KnowSongComponent implements OnInit {

  // question exports
  public options: Array<string>;
  public audio: string;

  // game properties
  public gameDescription: string;
  public questionNum: number;
  private arrayCounter: number;
  private game: SingleplayerGame; // private to prevent someone from scripting answers, i think this is effective anyway
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameBuilderService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( (data: {game: SingleplayerGame}) => {
      this.game = data.game;
      this.gameDescription = this.game.description;
      this.questionNum = 1;
      this.arrayCounter = 0;
      this.loadQuestion();
      
    });
    
  }

  loadQuestion(){
    let question: SingleplayerQuestion = this.game.questions[this.arrayCounter];  // load current question
    this.options = [question.answer, question.option2, question.option3, question.option4];
    this.audio = question.questionText; 
    this.shuffleArray(this.options); // shuffle the questions
    
  }
  private shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  onOptionPicked(option: string){
    this.game.questions[this.arrayCounter].userResponse = option;  // set user response to game object
    if(this.questionNum < 5){
      this.game.questions[this.arrayCounter].userResponse = option;  // set user response to game object
      this.questionNum++; 
      this.arrayCounter++;
      this.loadQuestion();  // load next question
    } else{
      this.gameService.storeGame(this.game).subscribe();
      this.router.navigate(['finishedgame']);

      console.log(this.game);
      // end game
    }
  }
  

}
