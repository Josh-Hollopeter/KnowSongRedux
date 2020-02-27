import { Artist } from './artist';

export class Album {

  id: number;
}


// @Injectable({
//   providedIn: "root"
// })

// // Adapter allows us to parse the specific JSON Data into the model efficiently
// export class AlbumAdapter implements AlbumInterface<Album>{
//   adapt(item: any): Album {
//     return null;
//   }
// }

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




