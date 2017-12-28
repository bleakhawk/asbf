import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Schedule } from '../../models/models';

import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'nga-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {

  schedules: Schedule[];

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public firebaseService: FirebaseService
  ) {

    this.firebaseService.getSchedule()
      .subscribe(schedules => {
        this.schedules = schedules;

        for (let s of this.schedules) {
          s.fromtime_short = this.convertToShortTime(s.fromtime);
          s.totime_short = this.convertToShortTime(s.totime);
        }
      });

  }

  ionViewDidLoad() {
  }

  convertToShortTime(time) { 
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1];
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0'+ hours : hours;

    var strTime = hours + ':' + minutes + ampm;
    return strTime;
  }

}

