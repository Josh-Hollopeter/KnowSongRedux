import { Component, OnInit } from '@angular/core';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.css']
})
export class GameHistoryComponent implements OnInit {

  constructor(
    private gameService: GameBuilderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gameService.getSingleplayerGames().subscribe( 
      response =>{
        console.log(response);
        
    });
  }

}
