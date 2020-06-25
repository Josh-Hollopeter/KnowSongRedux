import { Component, OnInit, ViewChild } from '@angular/core';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';
import { Router } from '@angular/router';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { GameHistory } from 'src/app/game/data/game-history';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.css']
})
export class GameHistoryComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public gameHistory: Array<SingleplayerGame>;
  public dataSource;
  public displayedGameColumns: string[] = ['id', 'description', 'date'];


  constructor(
    private gameService: GameBuilderService,
    private gameHistoryStorage: GameHistory,
    private router: Router
  ) { }

  ngOnInit(): void {

    // if games are not already loaded into client
    this.gameHistory = this.gameHistoryStorage.getSingleplayerGameHistory();
    if(this.gameHistory === undefined){
      this.gameService.getSingleplayerGames().subscribe( 
      response =>{
        this.gameHistory = response;
  
        this.populateTable();
      });
    } else{
      this.populateTable();
    }
  }

  populateTable(){
    this.dataSource = new MatTableDataSource(this.gameHistory);
    this.dataSource.sort = this.sort;
  }

}
