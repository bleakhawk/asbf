import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Workshop } from '../../models/workshop';
import { PlannerPage} from '../planner/planner';


@Component({
  selector: 'page-planner-detail',
  templateUrl: 'planner-detail.html'
})
export class PlannerDetailPage {

  workshop: any;
  isFavorited: boolean = false;
  toggled: boolean = false;
  favoriteWorkshops: Workshop[] = [];
  count: any;

  constructor(
    public navCtrl: NavController, 
    navParams: NavParams, 
    public storage: Storage
  ) {
    this.workshop = navParams.get('workshop');

    storage.get('favoriteWorkshops').then((val) => {
      this.favoriteWorkshops = val;
      this.count = val
    });

  }

    ionViewDidEnter() {
    this.storage.get('favoriteWorkshops').then((val) => {
      this.favoriteWorkshops = val;
    });
  }

  removeFavorite(workshop: Workshop) {
    
    this.favoriteWorkshops = this.favoriteWorkshops || [];

    for(var i = 0; i < this.favoriteWorkshops.length; i++) {
        if (this.favoriteWorkshops[i].name == this.workshop.name) {
            this.favoriteWorkshops.splice(i, 1);
            break;
        }
    }

    this.storage.set('favoriteWorkshops', this.favoriteWorkshops);
    this.navCtrl.push(PlannerPage, {
      workshop: workshop
    });

  }

}
