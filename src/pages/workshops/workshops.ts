import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { WorkshopDetailPage } from '../workshop-detail/workshop-detail';

//import { Workshops } from '../../providers/providers';

import { Filter } from '../../models/filter';
import { Workshop } from '../../models/models';
//import { OrderByPipe } from './workshop-order.pipe';

import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';


@Component({
  selector: 'page-workshops',
  templateUrl: 'workshops.html'
})
export class WorkshopsPage {

  @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef;

  currentWorkshops: Workshop[];
  allWorkshops: Workshop[];
  filters: Filter[];
  daysToInclude: string[] = ['thu', 'fri', 'sat', 'sun'];
  stylesToInclude: string[] = ['salsa', 'bachata', 'kizomba', 'other'];
  testCheckboxOpen: boolean;
  testCheckboxResult;


  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public firebaseService: FirebaseService
  ) {
    firebaseService.getWorkshops()
      .subscribe(workshops => {

        for (let workshop of workshops) {
          this.firebaseService.getArtistDetails(workshop.artistkey)
            .subscribe(artist => {
              workshop.artist = artist.name

              let storageRef = firebase.storage().ref();

              storageRef.child(artist.path).getDownloadURL().then((url) => {
                workshop.imageUrl = url;
              }).catch((error) => {
                console.log(error);
              });
            });
          workshop.timeShort = this.convertToShortTime(workshop.time);
          workshop.fulldate = new Date(workshop.date + ' ' + workshop.time);
          this.currentWorkshops = workshops.sort((n1, n2) => {
            return n1.datetime - n2.datetime
          });

          this.allWorkshops = workshops.sort((n1, n2) => {
            return n1.datetime - n2.datetime
          });
        }
      });

  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  displayFilters() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Filter workshops (Style/Day)');

    alert.addInput({
      type: 'checkbox',
      label: 'Salsa',
      value: 'salsa',
      checked: (this.stylesToInclude.indexOf('salsa') > -1)
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bachata',
      value: 'bachata',
      checked: (this.stylesToInclude.indexOf('bachata') > -1)
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Kizomba',
      value: 'kizomba',
      checked: (this.stylesToInclude.indexOf('kizomba') > -1)
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Other',
      value: 'other',
      checked: (this.stylesToInclude.indexOf('other') > -1)
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Filter by day',
      disabled: true
    })

    alert.addInput({
      type: 'checkbox',
      label: 'Thursday',
      value: 'thu',
      checked: (this.daysToInclude.indexOf('thu') > -1)
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Friday',
      value: 'fri',
      checked: (this.daysToInclude.indexOf('fri') > -1)
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Saturday',
      value: 'sat',
      checked: (this.daysToInclude.indexOf('sat') > -1)
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Sunday',
      value: 'sun',
      checked: (this.daysToInclude.indexOf('sun') > -1)
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        this.testCheckboxOpen = false;
        this.testCheckboxResult = data;

        this.daysToInclude = [];
        if (data.indexOf('thu') > -1) { this.daysToInclude.push('thu'); }
        if (data.indexOf('fri') > -1) { this.daysToInclude.push('fri'); }
        if (data.indexOf('sat') > -1) { this.daysToInclude.push('sat'); }
        if (data.indexOf('sun') > -1) { this.daysToInclude.push('sun'); }

        this.stylesToInclude = [];
        if (data.indexOf('salsa') > -1) { this.stylesToInclude.push('salsa'); }
        if (data.indexOf('bachata') > -1) { this.stylesToInclude.push('bachata'); }
        if (data.indexOf('kizomba') > -1) { this.stylesToInclude.push('kizomba'); }
        if (data.indexOf('other') > -1) { this.stylesToInclude.push('other'); }


        this.firebaseService.getWorkshops()
          .subscribe(workshops => {
            for (let workshop of workshops) {
              workshop.timeShort = '12 PM';

              this.firebaseService.getArtistDetails(workshop.artistkey)
                .subscribe(artist => {
                  workshop.artist = artist.name

                  let storageRef = firebase.storage().ref();

                  storageRef.child(artist.path).getDownloadURL().then((url) => {
                    workshop.imageUrl = url;
                  }).catch((error) => {
                    console.log(error);
                  });
                })
            }

            this.currentWorkshops =
              workshops
                .filter(workshop => this.stylesToInclude.indexOf(workshop.type.toLowerCase()) > -1)
                .filter(workshop => this.daysToInclude.indexOf(workshop.day.toLowerCase()) > -1);
          });
      }
    });
    alert.present().then(() => {
      this.testCheckboxOpen = true;
    });
  }

  searchWorkshops(ev) {
    let val = ev.target.value;

    this.currentWorkshops = this.allWorkshops
      .filter(w => (w.artist.toLowerCase().indexOf(val.toLowerCase()) >= 0)
        || (w.type.toLowerCase().indexOf(val.toLowerCase()) >= 0)
        || (w.day.toLowerCase().indexOf(val.toLowerCase()) >= 0)
      )
      .filter(workshop => this.stylesToInclude.indexOf(workshop.type.toLowerCase()) > -1)
      .filter(workshop => this.daysToInclude.indexOf(workshop.day.toLowerCase()) > -1);
  }

  clearFilters(ev) {
    this.currentWorkshops = this.allWorkshops;
  }

  openWorkshop(workshop: Workshop) {
    this.navCtrl.push(WorkshopDetailPage, {
      workshop: workshop
    });
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

