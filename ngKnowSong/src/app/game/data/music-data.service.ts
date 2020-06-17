import { Injectable } from '@angular/core';
import { Artist } from 'src/app/model/artist';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  public artist: Artist;

  constructor() { }

  setArtist(artist: Artist){
    this.artist = artist;
  }

  getArtist(): Artist {
    return this.artist;
  }

  removeArtist(){
    this.artist = null;
  }
}
