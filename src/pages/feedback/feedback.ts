import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { Storage } from '@ionic/storage';
import { OverallFeedback } from '../../models/models'
import * as firebase from 'firebase';


@Component({
  templateUrl: 'feedback.html',
  selector: 'feedback-page',
})
export class FeedbackPage {
  items = [];
  event: any;
  overallFeedback: OverallFeedback = new OverallFeedback();
  rating;
  favoriteArtist;
  favoriteWorkshop;
  favoriteShow;
  suggestions;
  artists;
  workshops;

  constructor(
    public nav: NavController,
    public firebaseService: FirebaseService,
    public storage: Storage,
  ) {

    console.log(localStorage.getItem('favoriteWorkshop'));
    console.log(localStorage.getItem('favoriteArtist'));
    console.log(localStorage.getItem('eventRating'));

    firebaseService.getArtists().subscribe(data => {
      this.artists = data;
    });

    firebaseService.getWorkshops().subscribe(data => {
      this.workshops = data;
    });

  }

  onWorkshopChange($event: string) {
    console.log('workshop changed');
    console.log($event);
    this.favoriteWorkshop = $event;
    this.overallFeedback.favoriteWorkshop = this.favoriteWorkshop;
    // if ($event != null) {
    //   this.overallFeedback.favoriteWorkshop = $event;
    //   localStorage.setItem('favoriteWorkshop', $event);
    // }
  }
  onArtistChange($event: string) {
    if ($event != null) {
      this.favoriteArtist = $event;
      this.overallFeedback.favoriteArtist = $event;
      localStorage.setItem('favoriteArtist', this.favoriteArtist);
    }
  }
  onRatingChange($event) {
    localStorage.setItem('eventRating', this.rating);
  }

  sendFeedback() {

    if (this.favoriteShow != null) {
      this.overallFeedback.favoriteShow = this.favoriteShow;
    }
    if (this.favoriteShow != null) {
      this.overallFeedback.suggestions = this.suggestions;
    }
    if (this.favoriteShow != null) {
      this.overallFeedback.overallrating = this.rating;
    }

    if (this.overallFeedback != null) {
      this.firebaseService.setEventRating(this.overallFeedback);
    }
  }

}
