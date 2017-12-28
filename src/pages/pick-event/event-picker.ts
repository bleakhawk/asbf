import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from '../../services/firebase.service';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'event-picker',
    templateUrl: 'event-picker.html',
})
export class EventPicker {

    events: any[];

    constructor(
        public navCtrl: NavController,
        public menu: MenuController,
        translate: TranslateService,
        public firebaseService: FirebaseService,
        private storage: Storage,
    ) {
        this.firebaseService.getEventsList()
        .subscribe(e => {
            this.events = e;
        });

    }

    startApp() {

        this.navCtrl.setRoot(TabsPage, {}, {
            animate: true,
            direction: 'forward'
        });

    }

    ionViewDidEnter() {
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    }

    ionViewWillLeave() {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    }

    async openEvent(event) {    

        localStorage.setItem('currentEvent', event.id);
        await this.firebaseService.loadPickedEventData();

        this.navCtrl.setRoot(TabsPage, {}, {
            animate: true,
            direction: 'forward'
          });
    }

}
