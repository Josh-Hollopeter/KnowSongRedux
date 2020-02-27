import { Album } from './album';

export class Track {
  id: string;
  name: string;
  duration: number;
  popularity: number;
  previewUrl: string;
  explicit: boolean;
  album: Album;

  constructor(
    id?: string,
    name?: string,
    duration?: number,
    popularity?: number,
    previewUrl?: string,
    explicit?: boolean,
    album?: Album
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.popularity = popularity;
    this.previewUrl = previewUrl;
    this.explicit = explicit;
    this.album = album;
  }
}
