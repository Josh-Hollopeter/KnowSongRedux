
export class Track {
  id: string;
  name: string;
  duration: number;
  popularity: number;
  previewUrl: string;
  explicit: boolean;
  lyrics: string;

  constructor(
    id?: string,
    name?: string,
    duration?: number,
    popularity?: number,
    previewUrl?: string,
    explicit?: boolean,
    lyrics?: string
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.popularity = popularity;
    this.previewUrl = previewUrl;
    this.explicit = explicit;
    this.lyrics = lyrics;
  }
}