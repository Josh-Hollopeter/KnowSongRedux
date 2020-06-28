import { Component, OnInit, Directive } from '@angular/core';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { SingleplayerQuestion } from 'src/app/model/singleplayer-question.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';
import { GameHistory } from '../data/game-history';

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
  public artistName: string;
  public gameType: string;
  public questionNum: number;
  private arrayCounter: number;
  private game: SingleplayerGame; // private to prevent someone from scripting answers, i think this is effective anyway
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameBuilderService,
    private gameHistory: GameHistory
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe( (data: {game: SingleplayerGame}) => {
      this.game = data.game;
      this.gameType = this.game.gameType;
      this.artistName = this.game.artist;
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
    // correct answer?
    if(option === this.game.questions[this.arrayCounter].answer){
      this.game.questions[this.arrayCounter].correct = true;
    } else{
      this.game.questions[this.arrayCounter].correct = false;
    }
    // is last question?
    if(this.questionNum < 5){
      this.questionNum++; 
      this.arrayCounter++;
      this.loadQuestion();  // load next question
    } else{
      this.gameHistory.setGamePlayed(true);
      this.gameService.storeGame(this.game).subscribe();
      this.router.navigate(['gamehistory', 'viewpreviousgame']);

      console.log(this.game);
      // end game
    }
  }
  

}
