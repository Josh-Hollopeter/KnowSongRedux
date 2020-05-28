import { AudioResolverService } from './../resolver/audio-resolver.service';
import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../data/music-data.service';
import { Album } from 'src/app/model/album';
import { Artist } from 'src/app/model/artist';

@Component({
  selector: 'app-know-song',
  templateUrl: './know-song.component.html',
  styleUrls: ['./know-song.component.css']
})
export class KnowSongComponent implements OnInit {

  public artist: Artist;
  public question;
  private answer;
  public tracks;

  constructor(
    private musicData: MusicDataService,
    private audioService: AudioResolverService,
  ) { }

  ngOnInit(): void {
    this.artist = this.musicData.artist;
    // this.buildQuestion();

    // this.activatedRoute.data.subscribe((questions: { question}) => {
    //   this.question = questions.question;
    //   console.log(this.artist.name);


    // })
    console.log(this.musicData.getArtist());

  }

  buildQuestion(){
    this.artist.albums.forEach(element => {
      this.tracks.push(element.tracks)
      console.log(this.tracks);
    });

  }


}
