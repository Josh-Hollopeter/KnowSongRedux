import { Track } from './track';

export class Playlist {
  public id: string;  //spotify id
  public description: string; //public description of playlist
  public name: string; //name of playlist
  public tracks: Track[];  //array of all the tracks in the playlist
}
