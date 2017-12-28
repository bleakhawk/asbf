import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ArtistDetailPage } from '../artist-detail/artist-detail';

//import { Artist } from '../../models/artist';
import { Artist } from '../../models/models';

import { FirebaseService } from '../../services/firebase.service';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';


@Component({
  selector: 'page-artists',
  templateUrl: 'artists.html'
})
export class ArtistsPage {

  artists: Artist[] = [];
  allArtists: Artist[] = [];
  imageUrl: any;
  searchArtist: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseService
  ) {
    this.searchArtist = environment.searchArtist;

    firebaseService.getArtists().subscribe(data => {
      this.artists = [];
      for (let artist of data) {
        let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child(artist.path);

        storageRef.child(artist.path).getDownloadURL().then((url) => {
          // Set image url
          artist.imageUrl = url;
        }).catch((error) => {
          console.log(error);
        });
        this.artists.push(artist);
      }
      this.allArtists = this.artists;
    });
  }

  ionViewDidLoad() {
  }

  searchArtists(ev) {
    let val = ev.target.value;
    this.artists = this.allArtists.filter( a => a.name.toLowerCase().indexOf(val.toLowerCase()) >= 0);
  }

  openArtist(artist: Artist) {
    this.navCtrl.push(ArtistDetailPage, {
      artist: artist
    });
  }

}
