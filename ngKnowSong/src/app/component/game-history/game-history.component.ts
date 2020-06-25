import { Component, OnInit } from '@angular/core';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';
import { Router } from '@angular/router';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { GameHistory } from 'src/app/game/data/game-history';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.css']
})
export class GameHistoryComponent implements OnInit {

  public gameHistory: Array<SingleplayerGame>;

  constructor(
    private gameService: GameBuilderService,
    private gameHistoryStorage: GameHistory,
    private router: Router
  ) { }

  ngOnInit(): void {

    // if games are not already loaded into client
    if(this.gameService.getSingleplayerGames === undefined){
      this.gameService.getSingleplayerGames().subscribe( 
      response =>{
        console.log(response);
        
      });
    } else{
      this.gameHistory = this.gameHistoryStorage.getSingleplayerGameHistory();
    }
  }

}
