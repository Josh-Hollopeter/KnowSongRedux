import { Album } from './album';

export class Artist {
  id: number;
  name: string;
  img: string;
  albums: Album[];

  constructor( id?: number, name?: string, img?: string, albums?: Album[]){
    this.id = id;
    this.name = name;
    this.img = img;
    this.albums = albums;
  }
}
