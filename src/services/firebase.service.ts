import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Event, Artist, Workshop, Schedule, EventListItem, EventImages } from '../models/models'
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  events: FirebaseListObservable<any[]>;
  event: any;
  eventfolder: any;

  artists: FirebaseListObservable<Artist[]>;
  artist: FirebaseObjectObservable<any>;
  artistfolder: any;

  workshops: FirebaseListObservable<any[]>;
  workshop: FirebaseObjectObservable<any>;

  eventpath = environment.eventpath;
  deviceid;

  constructor(
    public db: AngularFireDatabase,
    private storage: Storage,
    private platform: Platform,
    //private uniqueDeviceID: UniqueDeviceID,
  ) {
    this.eventfolder = 'eventimages';
    this.artistfolder = 'artistimages';

    if (platform.is('cordova')) {
      platform.ready().then(() => {
        this.deviceid = '';
      });
    } else {
      this.deviceid = 'debug';
    }

    //this.loadEventData();
  }

  async loadPickedEventData() {

    if (environment.multitenant) {
      let eventname = localStorage.getItem('currentEvent');

      this.eventpath = 'event-data/' + eventname + '/';

      this.artists = this.db.list(this.eventpath + 'artists') as FirebaseListObservable<Artist[]>;
      this.workshops = this.db.list(this.eventpath + 'workshops') as FirebaseListObservable<Workshop[]>;
    } else {
      this.artists = this.db.list(this.eventpath + 'artists') as FirebaseListObservable<Artist[]>;
      this.workshops = this.db.list(this.eventpath + 'workshops') as FirebaseListObservable<Workshop[]>;
    }


  }

  //leave this method for loading data from app module factory
  async loadEventData() {

  }

  getEventDetails() {
    return this.db.object(this.eventpath + 'event-info') as FirebaseObjectObservable<Event>
  }

  //Artist
  getArtists() {
    return this.artists;
  }

  getArtistDetails(id) {
    this.artist = this.db.object(this.eventpath + 'artists/' + id) as FirebaseObjectObservable<Artist>
    return this.artist;
  }

  //Workshop
  getWorkshops() {
    return this.workshops;
  }

  getWorkshopDetails(id) {
    this.workshop = this.db.object(this.eventpath + 'workshops/' + id) as FirebaseObjectObservable<Workshop>
    return this.workshop;
  }

  //Schedule
  getSchedule() {
    return this.db.list(this.eventpath + 'schedules') as FirebaseListObservable<Schedule[]>;
  }

  //DJ
  getDJs() {
    return this.db.list(this.eventpath + 'djs') as FirebaseListObservable<any[]>;
  }

  //Event List
  getEventsList() {
    return this.db.list('eventlist') as FirebaseListObservable<EventListItem[]>;
  }

  //Event Images
  getEventImages() {
    return this.db.object(this.eventpath + 'event-images') as FirebaseObjectObservable<EventImages>;
  }

  //Workshop rating
  setWorkshopRating(workshopid, rating) {
    //let d = device.u
    const item = this.db.object(this.eventpath + 'workshop-ratings/' + workshopid + '/' + this.deviceid);
    return item.set(rating);
  }

  //Artist rating
  setArtistRating(artistid, rating) {
    const item = this.db.object(this.eventpath + 'artist-ratings/' + artistid + '/' + this.deviceid);
    return item.set(rating);
  }

  //Overall rating
  setEventRating(rating) {
    const item = this.db.object(this.eventpath + 'event-ratings/' + this.deviceid);
    return item.set(rating);
  }

}//End of main class

