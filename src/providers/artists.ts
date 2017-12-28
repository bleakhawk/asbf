import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Artist } from '../models/artist';

@Injectable()
export class Artists {

  artists: Artist[] = [];

  constructor(public http: Http, public api: Api) {   
     var response = this.api.get('artists')
     .map(resp => resp.json())
     .subscribe((data) => {
      for(var s of data)
      {
        this.artists.push(s);
      }
     });
  }



  //query(params?: any) {
  //  return this.api.get('/artists', params)
  //   .map(resp => resp.json());
  //}

  query(params?: any) {
    if (!params) {
      return this.artists;
    }

    return this.artists.filter((artist) => {
      for (let key in params) {
        let field = artist[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return artist;
        } else if (field == params[key]) {
          return artist;
        }
      }
      return null;
    });
  }

  add(artist: Artist) {
  }

  delete(artist: Artist) {
  }

  defaultArtist: any = {
    "name": "Delia Madera",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Delia Madera.",
  };

}
