import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Artist } from '../../models/artist';

@Injectable()
export class Artists {
  artists: Artist[] = [];

  defaultArtist: any = {
    "name": "Delia Madera",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor(public http: Http) {
    let artists = [
      {
        "name": "Jose Maldonado",
        "profilePic": "assets/img/speakers/bear.jpg",
        "about": "Burt is a Bear."
      },
      {
        "name": "Delia Madera",
        "profilePic": "assets/img/speakers/cheetah.jpg",
        "about": "Charlie is a Cheetah."
      },
      {
        "name": "Billy Fajardo",
        "profilePic": "assets/img/speakers/duck.jpg",
        "about": "Donald is a Duck."
      },
      {
        "name": "Uriel Garcia",
        "profilePic": "assets/img/speakers/eagle.jpg",
        "about": "Eva is an Eagle."
      },
      {
        "name": "Ahtoy Juliana",
        "profilePic": "assets/img/speakers/elephant.jpg",
        "about": "Ellie is an Elephant."
      },
      {
        "name": "Vera Rowe",
        "profilePic": "assets/img/speakers/mouse.jpg",
        "about": "Molly is a Mouse."
      },
      {
        "name": "Mario B",
        "profilePic": "assets/img/speakers/puppy.jpg",
        "about": "Paul is a Puppy."
      }
    ];

    for (let artist of artists) {
      this.artists.push(new Artist(artist));
    }
  }

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
    this.artists.push(artist);
  }

  delete(artist: Artist) {
    this.artists.splice(this.artists.indexOf(artist), 1);
  }
}
