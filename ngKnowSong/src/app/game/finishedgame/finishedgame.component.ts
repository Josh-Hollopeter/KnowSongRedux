import { Component, OnInit } from '@angular/core';
import { GameServiceService } from '../data/game-service.service';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finishedgame',
  templateUrl: './finishedgame.component.html',
  styleUrls: ['./finishedgame.component.css']
})
export class FinishedgameComponent implements OnInit {

  private game: SingleplayerGame;

  constructor(
    private gameData: GameServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.game = this.gameData.getGame();
    
    if(this.game === undefined){
      this.router.navigate(['home']);
    }
  }

}
