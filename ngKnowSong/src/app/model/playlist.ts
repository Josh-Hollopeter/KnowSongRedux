import { Track } from './track';

export class Playlist {
  public id: string;  //spotify id
  public description: string; //public description of playlist
  public name: string; //name of playlist
  public tracks: Track[];
  constructor(id?:string, name?:string, description?:string, tracks?:Track[] ){
    this.id = id;
    this.description = description;
    this.name = name;
    this.tracks = tracks
  }

}
