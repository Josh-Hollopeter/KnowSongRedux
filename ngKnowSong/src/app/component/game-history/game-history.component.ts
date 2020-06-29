import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GameBuilderService } from 'src/app/service/API/game-builder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SingleplayerGame } from 'src/app/model/singleplayer-game.model';
import { GameHistory } from 'src/app/game/data/game-history';
import { MatTableDataSource} from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';

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
export class GameHistoryComponent implements OnInit{
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  public displayReady: Promise<boolean>;
  public gameHistory: Array<SingleplayerGame>;
  public dataSource: MatTableDataSource<SingleplayerGame> = new MatTableDataSource();
  public displayedGameColumns: string[] = ['artist', 'gameType', 'played'];
  public displayedQuestionColumns: string[] = ['correct', 'questionText', 'answer', 'userResponse'];
  public expandGameDetail: SingleplayerGame | null;

  constructor(
    private gameService: GameBuilderService,
    private gameHistoryStorage: GameHistory,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // if game has been played since last load, resync with backend
    
    if(
      this.gameHistoryStorage.getSingleplayerGameHistory() === undefined 
      || 
      this.gameHistoryStorage.getGamePlayed())
    {
      this.gameService.getSingleplayerGames().subscribe( 
      response =>{
        this.gameHistoryStorage.setGamePlayed(false); //reset flag
        this.gameHistory = response;
        this.populateTable();
      });
    } else{
    
      this.gameHistory = this.gameHistoryStorage.getSingleplayerGameHistory();
      this.populateTable();
    }
  }

  populateTable(){
    this.displayReady = Promise.resolve(true);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.data = this.gameHistory;
    
    // highlight latest game if redirected after finishing a game
    if(this.activatedRoute.snapshot.paramMap.get('viewGame') === 'viewpreviousgame'){
      this.expandGameDetail = this.gameHistory[0];
    }
    this.audioElements = document.getElementsByClassName('audioPlayers');
    
  }


  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      
      this.dataSource.paginator.firstPage();
      this.dataSource.paginator.pageSize = 10;
    }
  }

  toggleRow(element: SingleplayerGame){
    console.log("toggled");
    // element.questions as MatTableDataSource
    console.log(element);
    this.audioElements = document.getElementsByClassName('audioPlayers');
    console.log(document.getElementsByClassName('songNameColumn').length);
    
    console.log(this.audioElements.length);
    
  }
  
  // load 5 at a time when game is expanded to prevent lag
  // @ViewChild('audioPlayers', {static: false}) audioRef: ElementRef;
  // audio: HTMLAudioElement;
  audioElements;
  // audioUr
  pauseAudioElement(){
    this.audioElements = document.getElementsByClassName('audioPlayers');
    console.log(this.audioElements.length);
    console.log(this.expandGameDetail);
    
    
  }


}
