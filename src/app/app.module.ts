import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';


import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { WorkshopsPage } from '../pages/workshops/workshops';
import { WorkshopDetailPage } from '../pages/workshop-detail/workshop-detail';
import { WorkshopFilterPage } from '../pages/workshop-filter/workshop-filter';
import { ArtistsPage } from '../pages/artists/artists';
import { ArtistDetailPage } from '../pages/artist-detail/artist-detail';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { MorePage } from '../pages/more/more';
import { MoreDetailsPage } from '../pages/more/more';
import { PlannerPage } from '../pages/planner/planner';
import { PlannerDetailPage } from '../pages/planner-detail/planner-detail';
import { SchedulePage } from '../pages/schedule/schedule';
import { FeedbackPage } from '../pages/feedback/feedback';
import { EventPicker } from '../pages/pick-event/event-picker';

import { Settings } from '../providers/settings';
import { Favorites } from '../providers/favorites';
import { User } from '../providers/user';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

// Services
import { FirebaseService } from '../services/firebase.service';

// Initializer
import { APP_INITIALIZER } from '@angular/core';

// Pipes
import { FilterWorkshops } from '../pages/workshops/workshop-filter.pipe';
import { OrderByPipe } from '../pages/workshops/workshop-order.pipe';
import { ScheduleOrderByPipe } from '../pages/schedule/schedule-order.pipe';

import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    // AboutPage,
    // ContactPage,
    // HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailPage,
    WorkshopsPage,
    WorkshopDetailPage,
    WorkshopFilterPage,
    ArtistsPage,
    ArtistDetailPage,
    SettingsPage,
    TabsPage,
    TutorialPage,
    MorePage,
    MoreDetailsPage,
    PlannerPage,
    PlannerDetailPage,
    SchedulePage,
    FeedbackPage,
    EventPicker,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
