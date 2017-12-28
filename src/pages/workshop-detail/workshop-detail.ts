import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Workshop } from '../../models/workshop';
import { Ionic2RatingModule } from 'ionic2-rating';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'page-workshop-detail',
  templateUrl: 'workshop-detail.html'
})
export class WorkshopDetailPage {

  workshop: any;
  isFavorited: boolean = false;
  toggled: boolean = false;
  favoriteWorkshops: Workshop[] = [];
  debug: string = ''
  exists: boolean = true;
  rating;
  workshopRatings;

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    public storage: Storage,
    private alertCtrl: AlertController,
    private firebaseService: FirebaseService,
  ) {
    this.workshop = navParams.get('workshop');

    storage.get('favoriteWorkshops').then((val) => {
      this.favoriteWorkshops = val;
    });

    storage.get('workshopRatings').then((val) => {
      console.log(val);
      this.workshopRatings = val || [];

      for (var i = 0; i < this.workshopRatings.length; i++) {
        if (this.workshopRatings[i].name == this.workshop.name) {
          this.rating = this.workshopRatings[i].rating;
          break;
        }
      }

    });

  }

  ionViewDidEnter() {
    this.storage.get('favoriteWorkshops').then((val) => {
      this.favoriteWorkshops = val;
    });
  }

  addToFavorites(workshop: Workshop) {

    this.favoriteWorkshops = this.favoriteWorkshops || [];

    var found = false;
    for (var i = 0; i < this.favoriteWorkshops.length; i++) {
      if (this.favoriteWorkshops[i].name == this.workshop.name) {
        found = true;
        break;
      }
    }

    this.exists = found;

    if (!found) {
      this.favoriteWorkshops.push(workshop);
      this.storage.set('favoriteWorkshops', this.favoriteWorkshops);
    }

    this.presentAlert();

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Favorite Added',
      subTitle: 'Workshop added to favorites',
      buttons: ['Okay']
    });
    alert.present();
  }

  clearFavorites() {
    this.storage.set('favoriteWorkshops', []);
  }

  onRatingChange($event) {
    console.log('rating changed - ' + this.rating);
    console.log('length - '+ this.workshopRatings.length);

    //check if rating already exists
    var found = false;
    for (var i = 0; i < this.workshopRatings.length; i++) {
      if (this.workshopRatings[i].name == this.workshop.name) {
        found = true;
        this.workshopRatings.splice(i, 1);
        break;
      }
    }

    //Add rating
    let workshopRating = {
      name: this.workshop.name,
      rating: this.rating
    }


    this.workshopRatings.push(workshopRating);
    this.storage.set('workshopRatings', this.workshopRatings);
    this.firebaseService.setWorkshopRating(this.workshop.$key, this.rating);
  }

}
