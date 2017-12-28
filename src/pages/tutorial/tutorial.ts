import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { EventPicker } from '../pick-event/event-picker';

import { TranslateService } from '@ngx-translate/core';
import { FirebaseService } from '../../services/firebase.service';
import { environment } from '../../environments/environment';



export interface Slide {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  splashImage = environment.splashImage;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    translate: TranslateService,
    public firebaseService: FirebaseService
  ) {
    translate.get(["TUTORIAL_SLIDE1_TITLE",
      "TUTORIAL_SLIDE1_DESCRIPTION",
      "TUTORIAL_SLIDE2_TITLE",
      "TUTORIAL_SLIDE2_DESCRIPTION",
      "TUTORIAL_SLIDE3_TITLE",
      "TUTORIAL_SLIDE3_DESCRIPTION",
    ]).subscribe(
      (values) => {

        this.firebaseService.getEventDetails()
        .subscribe(event => {
          this.slides = [
            {
              title: environment.multitenant? "Congress Buddy Mobile App" : event.name,
              description: values.TUTORIAL_SLIDE1_DESCRIPTION,
              image: environment.splashImage,
            },
            {
              title: values.TUTORIAL_SLIDE2_TITLE,
              description: values.TUTORIAL_SLIDE2_DESCRIPTION,
              image: environment.splashImage,
            },
            {
              title: values.TUTORIAL_SLIDE3_TITLE,
              description: values.TUTORIAL_SLIDE3_DESCRIPTION,
              image: environment.splashImage,
            }
          ];
        });
      });
  }

  startApp() {
    if (environment.multitenant) {
      this.navCtrl.setRoot(EventPicker, {}, {
        animate: true,
        direction: 'forward'
      });
    } else {
      localStorage.setItem('currentEvent', environment.eventid);
      this.firebaseService.loadPickedEventData();
      this.navCtrl.setRoot(TabsPage, {}, {
        animate: true,
        direction: 'forward'
      });
    }

  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
