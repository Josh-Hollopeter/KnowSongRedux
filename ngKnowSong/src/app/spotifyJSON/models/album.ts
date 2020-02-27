import { Artist } from './artist';

export class Album {
  id: string;
  releaseYear: number;
  popularity: number;
  albumPhoto: string;
  albumType: string;
  albumGenre: string[];
  artist: Artist;

  constructor(
    id?: string,
    releaseYear?: number,
    popularity?: number,
    albumPhoto?: string,
    albumType?: string,
    albumGenre?: string[],
    artist?: Artist
  ) {
    this.id = id;
    this.releaseYear = releaseYear;
    this.popularity = popularity;
    this.albumPhoto = albumPhoto;
    this.albumType = albumType;
    this.albumGenre = albumGenre;
    this.artist = artist;
  }
}



