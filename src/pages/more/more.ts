import { Component } from '@angular/core';
import { MenuController, NavController, NavParams } from 'ionic-angular';
import { FirebaseService } from '../../services/firebase.service';
import { TabsPage } from '../tabs/tabs';
import { Event, Schedule } from '../../models/models';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { App } from 'ionic-angular';

import * as firebase from 'firebase';

@Component({
  templateUrl: 'more-details.html',
  
})
export class MoreDetailsPage {
  item: Event;
  schedules: Schedule[];
  event: Event;
  djs;
  aboutEventImageUrl;
  hotelImageUrl;
  events: any[];
  multitenant;

  constructor(
    params: NavParams,
    public navCtrl: NavController,
    public firebaseService: FirebaseService,
    private storage: Storage,
    public menu: MenuController,
    public appCtrl: App
  ) {
    this.item = params.data.item;

    //Get event schedule
    this.firebaseService.getSchedule()
      .subscribe(schedule => {
        this.schedules = schedule;
      });

    //Get Event Info
    firebaseService.getEventDetails().subscribe(data => {
      this.event = data;
    });

    //Get Event Images
    firebaseService.getEventImages().subscribe(data => {
      let storageRef = firebase.storage().ref();

      //More-About-Image
      if(data.eventmoreimagepath != null)
      {
        storageRef.child(data.eventmoreimagepath).getDownloadURL().then((url) => {
          this.aboutEventImageUrl = url;
        }).catch((error) => {
          console.log(error);
        });
      }

      //More-Hotel-Image
      if(environment.multitenant && data.eventhotelimagepath != null)
      {
        storageRef.child(data.eventhotelimagepath).getDownloadURL().then((url) => {
          this.hotelImageUrl = url;
        }).catch((error) => {
          console.log(error);
        });
      } else {
        this.hotelImageUrl = environment.hotelImage;
      }
      
    });

    //Get DJ Info
    firebaseService.getDJs().subscribe(data => {
      this.djs = data;
    });

    //Event list
    if (environment.multitenant) {
      this.multitenant = environment.multitenant;
      this.firebaseService.getEventsList()
        .subscribe(e => {
          this.events = e;
        });
    }

  }

  async openEvent(event) {
    localStorage.setItem('currentEvent', event.id);
    await this.firebaseService.loadPickedEventData()
      .then(val => {
        this.appCtrl.getRootNav().setRoot(TabsPage);
      });
  }
}

@Component({
  template: `
<ion-header>
  <ion-navbar color="abf-blue">
    <ion-title>More</ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-list>
    <button ion-item *ngFor="let item of items" (click)="openNavDetailsPage(item)" icon-left>
      <ion-icon class="icon-width" [name]="item.icon" color="abf-blue" item-start></ion-icon>
      {{ item.title }}
    </button>
  </ion-list>
</ion-content>
`
})
export class MorePage {
  items = [];
  event: any;

  constructor(
    public nav: NavController,
    public firebase: FirebaseService
  ) {
    firebase.getEventDetails().subscribe(data => {
      this.event = data;

      this.items = [
        {

          'title': 'About ' + this.event.name,
          'id': 'about',
          'icon': 'globe',
          'description': `'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.'`,
          'color': '#0CA9EA'
        },
        {
          'title': 'Event Schedule',
          'id': 'schedule',
          'icon': 'calendar',
          'description': `'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.'`,
          'color': '#0CA9EA'
        },
        {

          'title': 'Hotel',
          'id': 'hotel',
          'icon': 'bookmark',
          'description': `'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.'`,
          'color': '#0CA9EA'
        },
        {
          'title': 'Transportation',
          'id': 'transportation',
          'icon': 'train',
          'description': 'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.',
          'color': '#0CA9EA'
        },
        {
          'title': 'Theme Parties',
          'id': 'theme',
          'icon': 'bowtie',
          'description': 'The latest version of cascading stylesheets - the styling language of the web!',
          'color': '#0CA9EA'
        },
        {
          'title': 'DJs',
          'id': 'dj',
          'icon': 'musical-notes',
          'description': 'One of the most popular programming languages on the Web!',
          'color': '#0CA9EA'
        },
        {
          'title': 'Festival Tips',
          'id': 'tips',
          'icon': 'logo-freebsd-devil',
          'description': 'Syntactically Awesome Stylesheets - a mature, stable, and powerful professional grade CSS extension.',
          'color': '#0CA9EA'
        },
        {
          'title': 'Event Feedback',
          'id': 'feedback',
          'icon': 'ribbon',
          'description': 'The official mascot of the Linux kernel!',
          'color': '#0CA9EA'
        },
        // {
        //   'title': 'Social',
        //   'id': 'social',
        //   'icon': 'people',
        //   'description': 'The official mascot of the Linux kernel!',
        //   'color': '#0CA9EA'
        // },
        {
          'title': 'Contact Event',
          'id': 'contact',
          'icon': 'mail',
          'description': 'A super simple way to add formatting like headers, bold, bulleted lists, and so on to plain text.',
          'color': '#0CA9EA'
        },
        {
          'title': 'Rate the app',
          'id': 'rate',
          'icon': 'star',
          'description': `'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.'`,
          'color': '#0CA9EA'
        },
        // {
        //   'title': 'Switch to another event',
        //   'id': 'switch',
        //   'icon': 'swap',
        //   'description': `'A powerful Javascript framework for building single page apps. Angular is open source, and maintained by Google.'`,
        //   'color': '#0CA9EA'
        // },
      ]
    });


  }



  openNavDetailsPage(item) {
    this.nav.push(MoreDetailsPage, { item: item });
  }

}
