import { Injectable } from '@angular/core';
import { AlbumInterface } from './adapters/album-interface';

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
