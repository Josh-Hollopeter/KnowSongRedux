import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../data/music-data.service';
import { Album } from 'src/app/model/album';
import { Artist } from 'src/app/model/artist';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-know-song',
  templateUrl: './know-song.component.html',
  styleUrls: ['./know-song.component.css']
})
export class KnowSongComponent implements OnInit {

  public artist: Artist;
  public question;
  constructor(
    private musicData: MusicDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((questions: { question}) => {
      this.question = questions.question;
    })
    // console.log(this.musicData.getArtist());
    
  }

}
