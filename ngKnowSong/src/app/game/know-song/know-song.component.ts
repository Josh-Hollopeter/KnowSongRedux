import { AudioResolverService } from './../resolver/audio-resolver.service';
import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../data/music-data.service';
import { Artist } from 'src/app/model/artist';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { SingleplayerQuestion } from 'src/app/model/singleplayer-question.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-know-song',
  templateUrl: './know-song.component.html',
  styleUrls: ['./know-song.component.css']
})
export class KnowSongComponent implements OnInit {

  public artist: Artist;
  public previewUrl: string;
  public questions: Array<string>;
  private game: SingleplayerGame; // private to prevent someone from scripting answers, i think this is effective anyway

  constructor(
    private musicData: MusicDataService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.artist = this.musicData.artist;

    this.activatedRoute.data.subscribe( (data: {game: SingleplayerGame}) => {
      this.game = data.game;
      console.log(this.game.description);
      
      this.loadQuestion(1); //load the first question
    });
    
  }


  loadQuestion(questionNum: number){
    console.log(this.game);
    
    let question: SingleplayerQuestion = this.game.questions.find( item => item.num === questionNum);
    let options: string[] = [question.answer, question.option2, question.option3, question.option4];
    this.shuffleArray(options); // shuffle the questions
    this.previewUrl = question.questionText;
    this.questions = options;
  }

  setUserResponse(answer: string){
    console.log(answer);
  }

  playAudio(){
    
  }

  private shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

}
