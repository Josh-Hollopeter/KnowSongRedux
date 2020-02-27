import { Artist } from './artist';
import { Track } from './track';

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
  name: string;
  releaseDate: number;
  popularity: number;
  albumPhoto: string;
  albumType: string;
  albumGenre: string[];
  artist: Artist;
  tracks: Track[]

  constructor(
    id?: string,
    name?: string,
    releaseDate?: number,
    popularity?: number,
    albumPhoto?: string,
    albumType?: string,
    albumGenre?: string[],
    artist?: Artist,
    tracks?: Track[]
  ) {
    this.id = id;
    this.name = name;
    this.releaseDate = releaseDate;
    this.popularity = popularity;
    this.albumPhoto = albumPhoto;
    this.albumType = albumType;
    this.albumGenre = albumGenre;
    this.artist = artist;
    this.tracks = tracks;
  }
}




