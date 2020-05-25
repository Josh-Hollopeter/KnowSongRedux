import { Injectable } from '@angular/core';
import { Artist } from 'src/app/model/artist';
import { Album } from 'src/app/model/album';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  public artist: Artist;

  constructor() { }

  setArtist(artist: Artist){
    this.artist = artist;
  }
  
  addAlbum(album: Album){
    this.artist.albums.push(album);
  }

  isDuplicateAlbum(albumName: string): boolean{
    if(this.artist.albums.find( album => album.name === albumName) === undefined){
      return false;
    }
    return true;
  }

  getArtist(): Artist {
    return this.artist;
  }

  removeArtist(){
    this.artist = null;
  }
}
