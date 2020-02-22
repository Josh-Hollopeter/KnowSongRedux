import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongstreamService {

  constructor() { }


}


// Create a method to access JSON data:

// url = ".....";

// getData(): Observable<any> {
//        return this.http.get(this.url).map(res => res.json());
// }

// Now fetch client id:

// this.getData().subscribe(
//        res => {
//            let resources = res["resources"];
//            let resource = resources[0];
//            console.log(resource["client_id"]);
//        }
//    );
