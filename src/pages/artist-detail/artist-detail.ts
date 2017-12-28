import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'page-artist-detail',
  templateUrl: 'artist-detail.html'
})
export class ArtistDetailPage {
  artist: any;
  rating;
  artistRatings;

  constructor(
    public navCtrl: NavController, 
    navParams: NavParams, 
    public storage: Storage,
    private firebaseService: FirebaseService,
  ) {
    this.artist = navParams.get('artist');

    storage.get('artistRatings').then((val) => {
      this.artistRatings = val || [];

      for (var i = 0; i < this.artistRatings.length; i++) {
        if (this.artistRatings[i].name == this.artist.name) {
          this.rating = this.artistRatings[i].rating;
          break;
        }
      }

    });
  }

  onRatingChange($event) {

    //check if rating already exists
    var found = false;
    for (var i = 0; i < this.artistRatings.length; i++) {
      if (this.artistRatings[i].name == this.artist.name) {
        found = true;
        this.artistRatings.splice(i, 1);
        break;
      }
    }

    //Add rating
    let artistRating = {
      name: this.artist.name,
      rating: this.rating
    }


    this.artistRatings.push(artistRating);
    this.storage.set('artistRatings', this.artistRatings);
    this.firebaseService.setArtistRating(this.artist.$key, this.rating);
  }

}
