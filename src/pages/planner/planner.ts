import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Workshop } from '../../models/workshop';
import { PlannerDetailPage } from '../planner-detail/planner-detail';

@Component({
    selector: 'page-planner',
    templateUrl: 'planner.html'
})
export class PlannerPage {

    favoriteWorkshops: Workshop[] = [];
    workshop: Workshop;

    constructor(public storage: Storage, public navCtrl: NavController, private alertCtrl: AlertController) {
        storage.get('favoriteWorkshops').then((val: Workshop[]) => {
            this.favoriteWorkshops = val || [];
        });
    }

    ionViewDidEnter() {
        this.storage.get('favoriteWorkshops').then((val) => {
            this.favoriteWorkshops = val || [];
        });
    }

    addWorkshop(workshop: Workshop) {
        this.favoriteWorkshops.push(workshop);
    }

    removeFavorite(workshop: Workshop) {
        this.favoriteWorkshops = this.favoriteWorkshops || [];

        for (var i = 0; i < this.favoriteWorkshops.length; i++) {
            if (this.favoriteWorkshops[i].name == workshop.name) {
                this.favoriteWorkshops.splice(i, 1);
                break;
            }
        }

        this.storage.set('favoriteWorkshops', this.favoriteWorkshops);

    }

    openWorkshop(workshop: Workshop) {
        this.navCtrl.push(PlannerDetailPage, {
            workshop: workshop
        });
    }

    /*clearFavorites() {
    this.storage.set('favoriteWorkshops', []);
    this.favoriteWorkshops = [];
  }*/

    clearFavorites() {
        let alert = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Do you want to clear all your existing favorites?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Clear',
                    handler: () => {
                        this.storage.set('favoriteWorkshops', []);
                        this.favoriteWorkshops = [];
                    }
                }
            ]
        });
        alert.present();
    }

    convertToShortTime(time) {
        var hours = time.split(':')[0];
        //var minutes = time.split(':')[1];

        if (time == '11:00') {
            console.log(hours);
        }

        switch (time) {
            case '08:00': {
                return '8AM';
            }
            case '09:00': {
                return '9AM';
            }
            case '10:00': {
                return '10AM';
            }
            case '11:00': {
                return '11AM';
            }
            case '12:00': {
                return '12PM';
            }
            case '13:00': {
                return '1PM';
            }
            case '14:00': {
                return '2PM';
            }
            case '15:00': {
                return '3PM';
            }
            case '16:00': {
                return '4PM';
            }
            case '17:00': {
                return '5PM';
            }
            case '18:00': {
                return '6PM';
            }
            case '19:00': {
                return '7PM';
            }
            case '20:00': {
                return '8PM';
            }
            case '21:00': {
                return '9PM';
            }
            case '22:00': {
                return '10PM';
            }
            case '23:00': {
                return '11PM';
            }
            case '00:00': {
                return '12AM';
            }
        }

        // //minutes = minutes < 10 ? '0'+minutes : minutes;
        // var strTime = hours + ' ' + ampm;
        // //var strTime = hours + ':' + minutes + ' ' + ampm;
        // if (time == '11') {
        //   console.log(strTime);
        // }
        // return strTime;
        return time;
    }


}
