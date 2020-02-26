import { Track } from './track';

export class Playlist {
  public id: string;  //spotify id
  public description: string; //public description of playlist
  public name: string; //name of playlist

  constructor(id?:string, name?:string, description?:string ){
    this.id = id;
    this.description = description;
    this.name = name;
  }

}
