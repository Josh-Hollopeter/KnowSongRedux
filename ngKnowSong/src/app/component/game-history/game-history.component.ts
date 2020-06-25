import { Component, OnInit, ViewChild } from '@angular/core';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';
import { Router } from '@angular/router';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { GameHistory } from 'src/app/game/data/game-history';
import { MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GameHistoryComponent implements OnInit {
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  public displayReady: Promise<boolean>;
  public gameHistory: Array<SingleplayerGame>;
  public dataSource;
  public displayedGameColumns: string[] = ['id', 'description', 'played'];
  public displayedQuestionColumns: string[] = ['questionText', 'answer', 'userResponse'];
  public expandGameDetail: SingleplayerGame | null;

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
    this.displayReady = Promise.resolve(true);
    console.log(this.gameHistory);
  }

  displayGameDetail(game: SingleplayerGame){
    
  }

}
